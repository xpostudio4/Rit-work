var tour = {
  id: 'tour',
  steps: [
    {
      target: 'step0',
      title: '¡Bienvenido!',
      content: '¡Hola, Bienvenido! En esta página podrás llenar los datos referente a tu inmueble de manera más clara, por favor utiliza este asistente para guiarte a traves de todo el proceso.',
      placement: 'bottom',
      xOffset: 0
    },
    {
      target: 'step1',
      title: 'Tipo de inmmueble',
      content: 'Dentro de estas categorias, selecciona aquella que describa mejor tu propiedad.',
      placement: 'right',
	 xOffset: -120
    },{
      target: 'step2',
      title: 'Imágenes',
      content: 'En este campo podrás insertar imágenes de la propiedad; puedes seleccionar multiples imágenes si lo deseas. Asegurate que las imágenes sean lo más descriptivas posible.',
      placement: 'top',
	 xOffset: 0
    },{
      target: 'step3',
      title: 'Lugar',
      content: 'En este menú desplegable podrás encontrar las diferentes zonas donde La Costa Destination tiene una presencia significativa, si por alguna razón el lugar que busca no se encuentra, selecciona la opción Otros.',
      placement: 'bottom',
	 xOffset: 0
    },{
      target: 'step4',
      title: 'Precio y moneda',
      content: 'Una vez introduscas el precio, asegurate de seleccionar el tipo de moneda correcta.',
      placement: 'right',
	 xOffset: 0
    },{
      target: 'step5',
      title: 'Información acerca del inmueble',
      content: 'En los campos siguientes deberás llenar información respecto al inmueble, se preciso y específico, de esa manera el proceso de registro no sufrirá contratiempos ni demoras.',
      placement: 'top',
	 xOffset: 0
    },{
      target: 'step6',
      title: 'Notas',
      content: 'En este campo puedes hablar sobre cosas más específicas y así por ejemplo explicar o aclarar a La Costa Destination con más detalle caracteristicas del inmueble.',
      placement: 'right',
	 xOffset: -20
    },{
      target: 'step7',
      title: 'Zonificación',
      content: 'Dentro de estas categoría selecciona aquella que mejor describa la zona donde está hubicada tu propiedad. También no olvides poner el precio del mantenimiento (si lo hay).',
      placement: 'top',
	 xOffset: 0
    },{
      target: 'step8',
      title: 'Información de contacto',
      content: 'Asegurate de llenar correctamente los campos, pues La Costa Destination usara esta información para comunicarse con los respectivos.',
      placement: 'top',
	 xOffset: 0
    },{
      target: 'step9',
      title: 'Propietario',
      content: 'Hay dos campos para el propietario, el campo del propietario 1 (el principal) no se puede dejar vacío, el campo para el propietario 2 sí, este por  ejemplo, podria ser la persona que esta custodiando la propiedad.',
      placement: 'top',
	 xOffset: 0
    },{
      target: 'step10',
      title: 'Llaves',
      content: 'Llena aquí la información de la persona que posee las llaves y acceso a la propiedad, La Costa Destination se pondrá en contacto con esta persona en el momento oportuno.',
      placement: 'left',
	 xOffset: 0
    },{
      target: 'step11',
      title: 'El documento',
      content: 'Una vez termines de llenar toda la información pertinente, preciona este boton para generar el contrato junto con la información (puede tardar unos minutos). Ten pendiente que una copia de este documento será enviada también a nuestras oficinas.',
      placement: 'top',
	 xOffset: 0
    }
  ],
  showPrevButton: true,
  scrollTopMargin: 100
};

hopscotch.configure({
	i18n: {
		nextBtn: 'Siguiente',
		prevBtn: 'Anterior',
		doneBtn: 'Terminar',
		closeTooltip: 'Salir'
	}
});

hopscotch.startTour(tour);