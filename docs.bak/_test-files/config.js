const config = {

  environment: {
    // forward informations to max patch
    // set to false if no external max patch
    osc: false,
    // hack to keep devices awake
    // `true` for creations, `false` for production
    // update home instructions accordingly
    wakeLock: true,
  },

  txt: {
    home: {
      // title: 'SQUARE MILANO',
      // subtitle: 'by Lorenzo Bianchi Hoesch',
      // useHeadphones: 'Expérience à faire au casque<br />Use headphones',
      // instructionsHeader: 'Merci de (Please):',
      instructions: {
        wakeLock: 'DISATTIVARE IL BLOCCO AUTOMATICO DEL TELEFONO <br />  <br /> DISATTIVARE IL WIFI <br /> <br /> VERIFICARE DI NON ESSERE IN MODALITÀ PRIVATA <br /> <br /> DOPO RITORNARE SU QUESTA PAGINA E CLICCARE SULLO SCHERMO',
        // headphones: 'brancher vos écouteurs',
        // volume: 'ajuster le volume',
      },
      touchToStart: 'disable sleep mode, wifi connection, and private browsing <br /> Come back to this page <br /> then touch the screen to start',
    },
    soundCheck: {
      question: 'Senti distintamente la mia voce? <br> O ti sembra ci sia un problema ?',
      yes: 'SI',
      no: 'PROBLEMA',
      testFile: 'sounds/check/SQ-BOL-test-inizio-def.mp3',
    },
    restartPage: {
      restart: 'Ricominciare dall&#39;inizio <br> (Start from beginning)',
      continue: 'Continuare la visita <br> (Resume playback)',
    },
  },

  common: {
    fallbackStream: {
      id: 'streaming-loop-infinite',
      file: 'streams/streaming-loop-infinite.wav',
      loop: true,
    },
    enableSubtitles: true
  },

  states: [
    // ----------------------------------------------------------------------
    // INTRO
    // ----------------------------------------------------------------------
    {
      title: 'Intro',

      stream: {
        id: '01-INTRO',
        file: 'streams/01-INTRO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 0,
        },
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#000000',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 0.1,
        },
        {
          time: 0,
          type: 'text',
          placeholder: 'center',
          classes: ['white', 'align-center'],
          content: `
                  <span class="title">SQUARE BOLOGNA</span> <br />
                  <span class="subtitle">by Lorenzo Bianchi Hoesch</span>
            `,
        },
        {
          time: 5.5, // 0.01
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: `
            <p class="use-headphones"> Esperienza da fare in cuffia </p>
            <p class="fa fa-headphones" aria-hidden="true"></p>
            <p class="use-headphones"> Use headphones </p>
          `,
        },
        {
          time: 9.9,
          type: 'text',
          placeholder: 'center',
          content: '',
        },
        {
          time: 10.9,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `
            Riceverai delle immagini sul tuo telefono.
            <br /><br />
            Pictures will be displayed on the screen.
          `,
        },
        {
          time: 13.6,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `
            Dovrai trovare il punto dal quale quelle immagini sono state scattate.
            <br /><br />
            You have to find the exact spot where each picture was taken.
          `,
        },
        {
          time: 17.7,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `
            Solo a quel punto potrai cliccare e seguire il suo racconto.
            <br /><br />
            Only then can you click on the screen and continue the story.
          `,
        },
        {
          time: 20.7,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: ``,
        },
        {
          time: 21.7,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 28.3,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: `
            Benvenuta, benvenuto!
            <br /><br />
            Welcome!
          `,
        },
        {
          time: 30.3,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: ``,
        },
        {
          time: 74.0,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: `in another dimension`,
        },
        {
          time: 75.4,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/02.jpg',
        },
        {
          time: 75.9,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: ``,
        },
        {
          time: 76.6,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: `with voyeuristic intentions`,
        },
        {
          time: 77.4,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 78.2,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 1.4,
        },
        {
          time: 79,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: ``,
        },
        {
          time: 80.4,
          type: 'text-subtitle',
          placeholder: 'top',
          classes: ['gradient'],
          content: `La prima foto è apparsa.`
        },
        {
          time: 83.4,
          type: 'text-subtitle',
          placeholder: 'top',
          classes: ['gradient'],
          content: ``
        },
        {
          time: 93,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 93,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-0',
            file: 'sounds/touch/02-touch.mp3',
          }
        },
      ]
    },

    // ----------------------------------------------------------------------
    // STATE 1
    // ----------------------------------------------------------------------
    {
      title: 'Arco-immagine',

      stream: {
        id: '02-ARCO',
        file: 'streams/02-ARCO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 42,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/03.jpg',
        },
        {
          time: 43,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 41.8,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 4,
        },
        {
          time: 47,
          type: 'text-subtitle',
          classes: ['gradient'],
          placeholder: 'top',
          content: `Another photo`,
        },
        {
          time: 51,
          type: 'text-subtitle',
          classes: ['gradient'],
          placeholder: 'top',
          content: ``,
        },
        {
          time: 51.5,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 51.5,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-1',
            file: 'sounds/touch/03-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 2
    // ----------------------------------------------------------------------
    {
      title: 'Porta a SX',

      stream: {
        id: '03-PORTA-SX',
        file: 'streams/03-PORTA-SX.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 49,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/04.jpg',
        },
        {
          time: 51,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 50.5,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 74,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 74,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-2',
            file: 'sounds/touch/04-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 3
    // ----------------------------------------------------------------------
    {
      title: 'Piazza Coperta',

      stream: {
        id: '04-PIAZZA-COPERTA',
        file: 'streams/04-PIAZZA-COPERTA.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 80,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/05.jpg',
        },
        {
          time: 82,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 82.2,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 107,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 107,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-3',
            file: 'sounds/touch/05-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 4
    // ----------------------------------------------------------------------
    {
      title: 'Porta uscita Piazza Coperta',

      stream: {
        id: '05-PORTA-USCITA',
        file: 'streams/05-PORTA-USCITA.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 26,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/06.jpg',
        },
        {
          time: 28,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 27.8,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 37,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 37,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-4',
            file: 'sounds/touch/06-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 5
    // ----------------------------------------------------------------------
    {
      title: 'Uscita Nettuno',

      stream: {
        id: '06-USCITA-NETTUNO',
        file: 'streams/06-USCITA-NETTUNO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 14,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/07.jpg',
        },
        {
          time: 16,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 17.9,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 0.4,
        },
        {
          time: 72,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 72,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-5',
            file: 'sounds/touch/07-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 6
    // ----------------------------------------------------------------------
    {
      title: 'Ingresso porticato podestà',

      stream: {
        id: '07-PODESTA',
        file: 'streams/07-PODESTA.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 66,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/08.jpg',
        },
        {
          time: 68,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 69.4,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 101,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 101,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-6',
            file: 'sounds/touch/08-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 7
    // ----------------------------------------------------------------------
    {
      title: 'Fine porticato podestà',

      stream: {
        id: '08-FINE-PODESTA',
        file: 'streams/08-FINE-PODESTA.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 14,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/09.jpg',
        },
        {
          time: 16,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 16.4,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 40,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 40,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-7',
            file: 'sounds/touch/09-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 8
    // ----------------------------------------------------------------------
    {
      title: 'Pescherie vecchie',

      stream: {
        id: '09-PESCHERIE',
        file: 'streams/09-PESCHERIE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 80,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/10.jpg',
        },
        {
          time: 83,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 84.3,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 0.5,
        },
        {
          time: 93,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 93,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-8',
            file: 'sounds/touch/10-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 9
    // ----------------------------------------------------------------------
    {
      title: 'Mercato di mezzo',

      stream: {
        id: '10-MERCATO',
        file: 'streams/10-MERCATO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 35,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/11.jpg',
        },
        {
          time: 37,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 37.7,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 43,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 43,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-9',
            file: 'sounds/touch/11-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 10
    // ----------------------------------------------------------------------
    {
      title: 'Porta uscita',

      stream: {
        id: '11-USCITA-MERCATO',
        file: 'streams/11-USCITA-MERCATO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 21,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/12.jpg',
        },
        {
          time: 21,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 23.2,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 54,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 54,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-10',
            file: 'sounds/touch/12-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 11
    // ----------------------------------------------------------------------
    {
      title: 'Portico della morte',

      stream: {
        id: '12-PORTICO-MORTE',
        file: 'streams/12-PORTICO-MORTE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 56,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/13.jpg',
        },
        {
          time: 58,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 57.9,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 120,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 120,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-11',
            file: 'sounds/touch/13-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 12
    // ----------------------------------------------------------------------
    {
      title: 'Piazza maggiore',

      stream: {
        id: '13-PIAZZA_MAGGIORE',
        file: 'streams/13-PIAZZA_MAGGIORE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 36.5,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/14.jpg',
        },
        {
          time: 38.5,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 38.5,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 107,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 107,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-12',
            file: 'sounds/touch/14-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 13
    // ----------------------------------------------------------------------
    {
      title: 'Entrata san petronio',

      stream: {
        id: '14-ENTRATA-SAN-PETRONIO',
        file: 'streams/14-ENTRATA-SAN-PETRONIO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 26.6,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/15.jpg',
        },
        {
          time: 28.6,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 29.5,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 52,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 52,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-13',
            file: 'sounds/touch/15-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 14
    // ----------------------------------------------------------------------
    {
      title: 'Navata',

      stream: {
        id: '15-NAVATA',
        file: 'streams/15-NAVATA.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 44,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/16.jpg',
        },
        {
          time: 46,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 46.5,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 164,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 164,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-14',
            file: 'sounds/touch/16-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 15
    // ----------------------------------------------------------------------
    {
      title: 'Altare immagine',

      stream: {
        id: '16-ALTARE',
        file: 'streams/16-ALTARE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 81,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/17.jpg',
        },
        {
          time: 83,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 82,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 3,
        },
        {
          time: 131,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 131,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-15',
            file: 'sounds/touch/17-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 16
    // ----------------------------------------------------------------------
    {
      title: 'Pendolo',

      stream: {
        id: '17-PENDOLO',
        file: 'streams/17-PENDOLO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 49,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/18.jpg',
        },
        {
          time: 51,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 52.3,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 130,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 130,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-16',
            file: 'sounds/touch/18-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 17
    // ----------------------------------------------------------------------
    {
      title: 'Uscita',

      stream: {
        id: '18-USCITA-SAN-PETRONIO',
        file: 'streams/18-USCITA-SAN-PETRONIO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 48,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/19.jpg',
        },
        {
          time: 50,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 51.3,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 55,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 55,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-17',
            file: 'sounds/touch/19-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 18
    // ----------------------------------------------------------------------
    {
      title: 'Telefono',

      stream: {
        id: '19-TELEFONO',
        file: 'streams/19-TELEFONO.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 28,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/20.jpg',
        },
        {
          time: 30,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 32,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 0.5,
        },
        {
          time: 94,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 94,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-18',
            file: 'sounds/touch/20-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 19
    // ----------------------------------------------------------------------
    {
      title: 'Portone',

      stream: {
        id: '20-PORTONE',
        file: 'streams/20-PORTONE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 18,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/21.jpg',
        },
        {
          time: 18,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 18.3,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 58,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 58,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-19',
            file: 'sounds/touch/21-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 20
    // ----------------------------------------------------------------------
    {
      title: 'Scalone',

      stream: {
        id: '21-SCALONE',
        file: 'streams/21-SCALONE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 40,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/22.jpg',
        },
        {
          time: 42,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 39.8,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 4,
        },
        {
          time: 71,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 71,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-20',
            file: 'sounds/touch/22-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 21
    // ----------------------------------------------------------------------
    {
      title: 'Ascensore',

      stream: {
        id: '22-ASCENSORE',
        file: 'streams/22-ASCENSORE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 6,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/23.jpg',
        },
        {
          time: 8,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 8.4,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 21,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 21,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-21',
            file: 'sounds/touch/23-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 22
    // ----------------------------------------------------------------------
    {
      title: 'Bottone',

      stream: {
        id: '23-BOTTONE',
        file: 'streams/23-BOTTONE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 31.5,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/24.jpg',
        },
        {
          time: 33.5,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 33.5,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 48,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 48,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-22',
            file: 'sounds/touch/24-touch.mp3',
          }
        },
      ]
    },
    // ----------------------------------------------------------------------
    // STATE 23
    // ----------------------------------------------------------------------
    {
      title: 'Farnese',

      stream: {
        id: '24-FARNESE',
        file: 'streams/24-FARNESE.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Ascolta (Listen)`,
        },
        {
          time: 42,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/25.jpg',
        },
        {
          time: 44,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 43,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 3,
        },
        {
          time: 96,
          type: 'text',
          placeholder: 'center',
          classes: ['banner', 'white', 'align-center'],
          content: `<p class="big"> Toccare lo schermo una volta raggiunta la giusta posizione </p>`,
        },
        {
          time: 96,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-23',
            file: 'sounds/touch/25-touch.mp3',
          }
        },
      ]
    },


        // ----------------------------------------------------------------------
        // STATE 26
        // ----------------------------------------------------------------------
        {
          title: 'END',

          stream: {
            id: '25-FINESTRA',
            file: 'streams/25-FINESTRA.wav',
            loop: false,
          },
          // list of events
          events: [
            {
              time: 0,
              type: 'background-color',
              placeholder: 'background-color',
              color: '#272727',
            },
            {
              time: 0,
              type: 'fade-in',
              placeholder: 'background-color',
              duration: 1,
            },
            {
              time: 2,
              type: 'text',
              placeholder: 'top',
              content: `Ascolta (Listen)`,
            },
            {
              time: 149.2,
              type: 'text',
              placeholder: 'top',
              content: ``,
            },
            {
              time: 149.4,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `There's`,
            },
            {
              time: 149.7,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `no`,
            },
            {
              time: 149.9,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `synagogue`,
            },
            {
              time: 150.7,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 151.5,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `church`,
            },
            {
              time: 152.3,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 152.6,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `polis`,
            },
            {
              time: 153.7,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 154.1,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `ethnic`,
            },
            {
              time: 154.6,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `community`,
            },
            {
              time: 155.6,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 155.9,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `that`,
            },
            {
              time: 156.2,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `does`,
            },
            {
              time: 156.4,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `not`,
            },
            {
              time: 156.6,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `deserve`,
            },
            {
              time: 157.3,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 157.7,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `to`,
            },
            {
              time: 157.8,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `be`,
            },
            {
              time: 157.9,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: `abandoned...`,
            },
            {
              time: 158.7,
              type: 'text-subtitle',
              placeholder: 'center',
              // classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 158.8,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                      <span class="title">SQUARE <br /> BOLOGNA</span> <br />
                `,
            },
            {
              time: 162.5,
              type: 'text',
              placeholder: 'center',
              content: ``,
            },
            {
              time: 163,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt class="first">Ideazione e composizione:</dt>
                  <dd class="first">Lorenzo Bianchi Hoesch</dd>
                </dl>
              `,
            },
            {
              time: 164.5,
              type: 'text',
              placeholder: 'bottom',
              classes: ['banner'],
              content: `
                <a target="_blank" rel="noopener noreferrer" href="http://www.ornithology-productions.com/square/">More info</a>
                <a href=mailto:lorenzo.bianchi@lorbi.info>lorenzo.bianchi@lorbi.info</a>
                `,
            },
            {
              time: 167,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt>Voce guida:</dt>
                  <dd>Fiorenza Menni</dd>
                </dl>
              `,
            },
            {
              time: 170,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt>Background:</dt>
                  <dd>Michele di Stefano</dd>
                </dl>
              `,
            },
            {
              time: 173,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt>Ricerca e sviluppo:</dt>
                  <dd>
                    David Poirier-Quinot <br />
                    Benjamin Matuszewski
                  </dd>

                  <dt>Assistente:</dt>
                  <dd>Victor Audouze</dd>
                </dl>
              `,
            },
            {
              time: 176.5,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 177,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt>Con la partecipazione di:</dt>
                  <dd>
                    Marco Pasqualicchio <br />
                    Giovanni Ginocchini <br />
                    Valentina Picello <br />
                    Massimo Carosi <br />
                    Benno Steinegger <br />
                    Deborah Lopatin <br />
                    Szuwha Wu <br />
                    Amir Elsaffar
                  </dd>
                </dl>
              `,
            },
            {
              time: 184.5,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 185,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt class="first">In collaborazione con:</dt>

                  <dt>Interaction son musique mouvement, Ircam-STMS:</dt>
                  <dd>
                    Norbert Schnell <br />
                    Frédéric Bevilacqua <br />
                    Benjamin Matuszewski
                  </dd>

                  <dt>Espaces acoustiques et cognitifs, Ircam-STMS:</dt>
                  <dd>
                    David Poirier-Quinot <br />
                    Olivier Warusfel
                  </dd>

                  <br />
                  <br />

                  <p class="tiny left grey">
                    Consulenti scientifici Ircam.
                  </p>
                </dl>
              `,
            },
            {
              time: 192.5,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: ``,
            },
            {
              time: 193,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: `
                <dl>
                  <dt>Produzione:</dt>
                  <dd>
                    IRCAM Centre Pompidou <br />
                    Ornitology Productions
                  </dd>

                  <dt>Coproduzione:</dt>
                  <dd>KLM, Festival Danza Urbana</dd>

                  <dt>Produttore esecutivo:</dt>
                  <dd>PLATÔ</dd>

                  <dt>Evento realizzato in collaborazione con:</dt>
                  <dd>
                    ATER – Circuito Multidisciplinare <br />
                    FIU - Fondazione per l'Innovazione Urbana
                  </dd>

                  <br />
                  <br />
                  <p class="tiny left grey ">
                    Le tecnologie web interattive utilizzate sono state sviluppate durante
                    il progetto CoSiMa (Collaborative Situated Media) sostenuto
                    dall'Agence nationale de la recherche (ANR) e coordinato dall'IRCAM Centre Pompidou.
                  </p>
                </dl>
              `,
            },
            {
              time: 208,
              type: 'text',
              placeholder: 'center',
              classes: ['white', 'align-center'],
              content: ``,
            },
          ]
        },
      ],
    };

    module.exports = config;
