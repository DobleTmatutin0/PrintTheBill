# language: es

Característica: Gestión de obras
   Escenario: recuperar lista de obras
      Dado que existen la obra "Hamlet"
      Y que existen la obra "Othello"
      Y que existen la obra "As You Like It"
      Cuando solicitamos recuperar la lista de obras
      Entonces esperamos recibir estado 200
      Y el mensaje de respuesta "OK"
      Y los siguientes datos:
         """
         [{
            "code": "hamlet",
            "name": "Hamlet",
            "type": "tragedy"
         },{
            "code": "as-like",
            "name": "As You Like It",
            "type": "comedy"
         },      
         {
            "code": "othello",
            "name": "Othello",
            "type": "tragedy"
         }]
         """

