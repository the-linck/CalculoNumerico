(
    /**
     * @description Inicializa os namespaces do projeto.
     * @returns {Object} Namespace mais abrangente do Projeto.
     */ 
    function initMetodos(global) {
        var Metodos;
        if (global.hasOwnProperty('Metodos')) {
          Metodos = global['Metodos'];
        } else {
            /**
             * @description Automatiza tarefas gerais repetitivas.
             * @type {Object}
             */
            Metodos = global['Metodos'] = {
                /**
                 * @description Cria um objeto com os valores informados complementados por valores padrão.
                 * @param {Object} values Valores que devem sobrescrever os padrões.
                 * @param {Object} [defaults] Valores padrões.
                 * @returns {Object} Objeto com valores informados sobrescrevendo padrões.
                 */ 
                "copyObject": function copyObject(values, defaults) {
                    var result = {};
                    if (values == null) {
                        if (defaults != null) for (var field in defaults) {
                            result[field] = defaults[field];
                        }
                    } else {
                        for (var field in values) {
                            result[field] = values[field];
                        }
                        if (defaults != null) for (var field in defaults) {
                            if (!result.hasOwnProperty(field)) {
                                result[field] = defaults[field];
                            }
                        }
                    }
                    return result;
                },
                /**
                 * @description Cria uma nova classe.
                 * @param {Function} constructor Função construtora.
                 * @param {Object} [instance] Campos de instância.
                 * @param {Object} [static] Campos estáticos.
                 * @returns {Metodos.Class} Classe criada.
                 */
                "Class": function Class(constructor, instance, static) {
                    var member;
                    if (static != null) for (member in static) {
                        constructor[member] = static[member];
                    }
                    if (instance != null) for (member in instance) {
                        constructor.prototype[member] = instance[member];
                    }
                    return constructor;
                },
                /**
                 * @description Cria uma novo Namespace.
                 * @param {String} id Identificador do Namespace. Use pontos para definir namespaces aninhados.
                 * @param {Object} content Conteúdo do Namespace.
                 * @param {Object} [parent] Namespace no qual esse deve ser criado. Por padrão será o objeto window.
                 */
                "Namespace": function (id, content, parent) {
                    var path = id.lastIndexOf(-1) > -1 ? id.split(".") : [id];
                    var piece;
                    var namespace = parent == null ? window : parent;
                    for (var index = 0, limit = path.length; index < limit; index++) {
                        piece = path[index];
                        if (!namespace.hasOwnProperty(piece)) {
                            namespace[piece] = {};
                        }
                        namespace = namespace[piece];
                    }
                    for (var property in content) {
                        if (!namespace.hasOwnProperty(property)) {
                            namespace[property] = content[property];
                        }
                    }
                }
            };
            /**
             * @description Simplifica as operações com elementos do DOM.
             * @type {Metodos.Class}
             */
            Metodos["Element"] = new Metodos.Class(
                /**
                 * @description Cria um novo elemento HTML.
                 * @param {Function} constructor Função construtora.
                 * @param {Object} [instance] Campos de instância.
                 * @param {Object} [static] Campos estáticos.
                 * @returns {HTMLElement} Classe criada.
                 */ 
                function Element(tag, attributes, text) {
                    var element = document.createElement(tag);
                    if (text != null) {
                        element.textContent = text;
                    }
                    if (attributes != null){
                         for (var index in attributes) {
                            element.setAttribute(index, attributes[index]);
                        }
                    }
                    return element;
                },
                null,
                {
                    "get": document.getElementById,
                    "query": function queryElement(selector, parent) {
                        var node;
                        if (parent instanceof HTMLElement) {
                            node = parent;
                        } else {
                            node = document;
                        }
                        return node.querySelector(selector);
                    },
                    "queryAll": function queryElements(selector, parent) {
                        var node;
                        if (parent instanceof HTMLElement) {
                            node = parent;
                        } else {
                            node = document;
                        }
                        return node.querySelectorAll(selector);
                    }
                }
            );
        }
        return Metodos;
    }
)(window);