
const tours = [
    {
        TourId: "tu1",
        imagen: "medellin-walking-tour.jpg",
        galeria: [],
        nombre: "Medellín Walking Tour",
        categorias: ['cultura','historia'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "6",
        idGuia: "00001",
        descripcion: "Sumérgete en la rica historia y cultura de la ciudad mientras paseas por coloridas calles, descubres arte urbano fascinante y te maravillas con la arquitectura icónica. Desde la Plaza Botero hasta la Catedral Metropolitana, este recorrido a pie te llevará a lugares emblemáticos, permitiéndote conocer de cerca la transformación de Medellín en un destino moderno y acogedor. ¡Únete a nosotros para una experiencia única llena de sorpresas y autenticidad!"
        
    },
    {
        TourId: "tu2",
        imagen:"arquitectura-unica.jpg",
        nombre: "Tour Arquitectura Única en Medellín",
        categorias: ['arquitectura','arte','innovador'],
        lugar: "medellin",
        idioma: ['español','ingles','frances'],
        duracion: "4",
        idGuia: "00002",
        descripcion: "Embárcate en un fascinante tour de arquitectura única en Medellín, donde cada edificio cuenta su propia historia extraordinaria. Exploraremos la ciudad desde una perspectiva arquitectónica, destacando innovadores diseños que fusionan lo moderno con lo tradicional. Desde los icónicos rascacielos en El Poblado hasta las estructuras vanguardistas en Laureles, descubrirás cómo la arquitectura ha contribuido a la metamorfosis de Medellín."
        
    },
    {
        TourId: "tu3",
        imagen:"frutas-tropicales.jpg",
        nombre: "Sabores Tropicales en Las Calles de Medellín",
        categorias: ['gastronomia','cultura'],
        lugar: "medellin",
        idioma: ['ingles'],
        duracion: "2",
        idGuia: "00003",
        descripcion: "Descubre la riqueza culinaria de la ciudad mientras exploras puestos de comida callejera y restaurantes auténticos. Desde exquisitas arepas rellenas hasta jugos de frutas frescas, cada bocado es una explosión de sabores tropicales que reflejan la diversidad cultural de Medellín."
        
    },
    {
        TourId: "tu4",
        imagen:"el-camino-de-los-abuelos.jpg",
        nombre: "El Camino de Los Abuelos",
        categorias: ['historia','naturaleza','fotografia'],
        lugar: "jerico",
        idioma: ['español','ingles','aleman'],
        duracion: "6",
        idGuia: "00004",
        descripcion: "Monta a caballo mientras exploras los paisajes pintorescos que rodean Jericó, siguiendo los mismos caminos que alguna vez recorrieron los abuelos de la comunidad. A medida que avanzas, descubrirás la conexión profunda entre la naturaleza y la historia local, con paradas estratégicas en puntos de interés cultural y miradores impresionantes."
        
    },
    {
        TourId: "tu5",
        imagen:"tour-innovacion-social.jpg",
        nombre: "Tour Innovación Social",
        categorias: ['cultura','historia','arte'],
        lugar: "medellin",
        idioma: ['español','ingles','frances','aleman'],
        duracion: "6",
        idGuia: "00005",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu6",
        imagen:"tour-oriente-antioqueño.jpg",
        nombre: "Tour Oriente Antioqueño",
        categorias: ['cultura','historia','arquitectura'],
        lugar: "Marinilla",
        idioma: ['español','aleman'],
        duracion: "8",
        idGuia: "00006",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu7",
        imagen:"jardin-pueblito-magico.jpg",
        nombre: "Jardín Pueblito Mágico",
        categorias: ['cultura','historia','arte','fotografia'],
        lugar: "medellin",
        idioma: ['español','frances'],
        duracion: "6",
        idGuia: "00007",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu8",
        imagen:"guatape-el-cacique-indigena.jpg",
        nombre: "Guatapé el Cacique Indígena",
        categorias: ['cultura','historia','naturaleza'],
        lugar: "guatape",
        idioma: ['español'],
        duracion: "8",
        idGuia: "00008",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu9",
        imagen:"comuna-13-operacion-orion.jpg",
        nombre: "Comuna 13 Operación Orión",
        categorias: ['cultura','historia','arte','fotografia'],
        lugar: "medellin",
        idioma: ['español','ingles','aleman'],
        duracion: "6",
        idGuia: "00009",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu10",
        imagen:"ciclo-tour.jpg",
        nombre: "Ciclo Tour Medellín",
        categorias: ['deporte','historia'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "6",
        idGuia: "000010",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu11",
        imagen:"medellin-a-las-alturas.jpg",
        nombre: "Medellín a Las Alturas",
        categorias: ['deporte','naturaleza'],
        lugar: "medellin",
        idioma: ['español','ingles','aleman','frances'],
        duracion: "2",
        idGuia: "000011",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu12",
        imagen:"tour-terrazas.jpg",
        nombre: "Tour Terrazas Medellín",
        categorias: ['cultura','fotografia','nocturno'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000012",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu13",
        imagen:"miradores-tour.jpg",
        nombre: "Miradores Tour",
        categorias: ['cultura','fotografia','nocturno','naturaleza'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000013",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu14",
        imagen:"comida-callejera.jpg",
        nombre: "Sabor Medellín, Comida Callejera",
        categorias: ['cultura','fotografia','nocturno','urbano'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000012",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu15",
        imagen:"tipico-montañero.jpg",
        nombre: "Típico Montañero",
        categorias: ['cultura','fotografia','nocturno','gastronomia'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000012",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu16",
        imagen:"cata-cerveza.jpg",
        nombre: "Cata de Cervezas",
        categorias: ['cultura','gastronomia','urbano'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000012",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu17",
        imagen:"cata-cafe.jpg",
        nombre: "Cata de Café Colombiano",
        categorias: ['gastronomia','cultura'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000012",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },
    {
        TourId: "tu18",
        imagen:"sabor-tropical.jpg",
        nombre: "Sabor Tropical Tour",
        categorias: ['gastronomia','urbano'],
        lugar: "medellin",
        idioma: ['español','ingles'],
        duracion: "4",
        idGuia: "000012",
        descripcion: "Nuestro recorrido te llevará a través de las coloridas calles decoradas con impresionante arte urbano, donde cada mural cuenta una historia única. Conocerás de cerca el arte y la cultura que han florecido en medio de desafíos históricos. Los escaladores eléctricos te llevarán por las empinadas colinas, brindándote vistas panorámicas impresionantes de la ciudad."
        
    },

]
