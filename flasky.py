#!/usr/bin/python
# -*- coding: utf-8 -*-
# by MaG
import os
import time
from flask import Flask, redirect, request, url_for, abort
from flask import render_template, send_file
from dropbox import client, rest, session
from xhtml2pdf import pisa
from cStringIO import StringIO
from werkzeug import secure_filename
from flask.ext.sqlalchemy import SQLAlchemy

APP_KEY        = '0y9r8zwiz5mbyyj'
APP_SECRET     = 's4gexoj4x1gt65s'
WORKING_FOLDER = '/Captaciones'

# init
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH']      = 5 * 1024 * 1024 # 6 Mb
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

db             = SQLAlchemy(app)
sess           = None
request_token  = None
dropbox_client = None
flushed        = True # state variable.

class Token(db.Model):
	__tablename__ = 'tokens'
	tokens_id  = db.Column(db.Integer, primary_key=True)
	key        = db.Column(db.String(50), unique=True)
	secret     = db.Column(db.String(50), unique=True)

	def __init__(self, key, secret):
		self.key    = key
		self.secret = secret

	def __repr__(self):
		return '<Key %r>' % self.key

def dropbox_mkdir(dropbox_client, string):
	''' Make a new dropbox directoy, if exists keep (or not) trying 'till create'''
	counter   = 1
	directory = "%s/%s" % (WORKING_FOLDER,string)
	dir_name  = directory

	while True:
		try:
			dropbox_client.file_create_folder(dir_name)
		except rest.ErrorResponse as e:
			if e.status != 403:
				return ''

			dir_name = "%s(%d)" % (directory, counter)
			counter += 1
			continue
		break

	return dir_name

def create_pdf(data):
	pdf = StringIO()
	io_data = StringIO(data.encode('utf-8'))
	pisa.CreatePDF(io_data, pdf) 
	io_data.close()
	return pdf

EXTS = ['png', 'jpeg', 'jpg', 'tiff', 'gif']
def allowed_file(filename):
        if '.' in filename:
                if filename.rsplit('.', 1)[1] in EXTS:
                        return True
        return False

def change_dropbox_account(**context):
	global sess, request_token

	sess          = session.DropboxSession(APP_KEY, APP_SECRET, 'dropbox')
	request_token = sess.obtain_request_token()
	authorize_url = sess.build_authorize_url(request_token)
	context.update(authorize_url = authorize_url)
	return render_template('dropbox.html', **context)

def set_dropbox_account_from_db():
	global sess, request_token, dropbox_client, db

	sess          = session.DropboxSession(APP_KEY, APP_SECRET, 'dropbox')
	request_token = sess.obtain_request_token()

	token = Token.query.filter_by(tokens_id=1).first()
	try:
		sess.set_token(token.key,token.secret)
	except:
		return False

	dropbox_client = client.DropboxClient(sess)

	return True

@app.route('/')
def index():
	global flushed

	if flushed:
		if not set_dropbox_account_from_db():
			return change_dropbox_account(error=True)
		flushed        = False

	return redirect( url_for('static', filename='index.html') )

@app.route('/form', methods=['POST'])
def formulario():
	global dropbox_client, flushed

	if flushed:
		if not set_dropbox_account_from_db():
			return change_dropbox_account(error=True)
		flushed = False

	dir_name = dropbox_mkdir(dropbox_client, request.form.get('owner1', 'desconocido'))
	if not dir_name:
		abort(500)

	# upload images if any.
	for file_storage in request.files.getlist('file[]'):
		if not file_storage.filename:
			continue

		#if not allowed_file(file_storage.filename):
			#continue
		
		filename = "%s/%s"% (dir_name, secure_filename(file_storage.filename))

		try:
			file_storage.stream.seek(0)
			dropbox_client.put_file(filename, file_storage.stream)
		except:
			# TODO
			continue

		file_storage.close()

	io_pdf = create_pdf(render_template('formulario.html') )
	io_pdf.seek(0)
	filename = "%s/%s-%s.pdf" % (dir_name, request.form.get('owner1', 'document'), time.strftime("%d-%B-%Y"))
	dropbox_client.put_file(filename, io_pdf)

	io_pdf.seek(0)
	return send_file(io_pdf, attachment_filename='doc.pdf', as_attachment=True)

@app.route('/dropbox')
def dropbox():
	return change_dropbox_account()

@app.route('/authorize')
def set_dropbox_parameters():
	global db, sess, dropbox_client

	if not sess:
		return change_dropbox_account()

	try:
		access_token = sess.obtain_access_token(request_token)
		db.session.query(Token).filter_by(tokens_id=1).update({"key": access_token.key, "secret": access_token.secret})
		db.session.commit()
	except rest.ErrorResponse:
		return change_dropbox_account(error=True)
	except:
		abort(404)

	dropbox_client = client.DropboxClient(sess)

	try:
		dropbox_client.file_create_folder(WORKING_FOLDER)
	except rest.ErrorResponse as e:
		if e.status != 403:  # 403 = already exists.
			abort(500)

	return redirect(url_for('index'))

@app.route('/<path:path>')
def any(path):
	abort(404)

if __name__ == '__main__':
	app.run(port=8000, debug=True)
