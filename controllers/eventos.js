module.exports = function (app) {

    var Evento = app.models.eventos;

    var EventosController = {
        menu: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/menu', params);
        },
        cadastroUsuario: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadUsuario', params);
        },
        cadastroEvento: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadEvento', params);
        },
        listaEventos: function (request, response) {
            Evento.find(function (erro, eventos) {
                if (erro) {
                    response.render('/menu');
                }
                else {
                    var usuario = request.session.usuario,
                        params = { usuario: usuario, eventos: eventos };
                    response.render('eventos/listaEventos', params);
                }
            });
        },
        //cadastro de eventos
        novoEvento: function (request, response) {
            var descricao = request.body.evento.descricao;
            var data = request.body.evento.data.split('/');
            //formato dd/MM/yyyy
            var objDate = new Date(data[2], data[1] - 1, data[0]);
            var responsavel = request.body.evento.responsavel; 

            if (descricao.trim().length == 0) {
                response.redirect('/cadEvento');
            }
            else {
                //var evento = request.body.evento;
                var evento = {
                    "descricao": descricao,
                    "data": objDate,
                    "responsavel": responsavel
                }

                Evento.create(evento, function (erro, evento) {
                    if (erro) {
                        console.log('Ocorreu um erro');
                        response.redirect('/cadEvento');
                    } else {
                        console.log('Cadastrado com sucesso');
                        response.redirect('/menu');
                    }
                });
            }
        }


    };
    return EventosController;
}; 