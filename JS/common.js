(
    /**
     * @description Inicializa os namespaces do projeto.
     * @returns {Object} Namespace mais abrangente do Projeto.
     */ 
    function initCalculo(global) {
        /**
         * @description Automatiza tarefas gerais repetitivas.
         * @type {Object}
         */
        var Calculo;
        if (!global.hasOwnProperty('Calculo')) {
            global['Calculo'] = {
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
                }
            };
        }
        if (!Calculo.hasOwnProperty('Element')) {
            /**
             * @description Simplifica as operações com elementos do DOM.
             * @type {Calculo.Class}
             */
            Calculo["Element"] = {
                /**
                 * @description Cria um novo elemento HTML.
                 * @param {String} tag Tag HTML.
                 * @param {Object} [attributes]
                 * @param {String} [text]
                 * @returns {HTMLElement} Elemento criado.
                 */
                "constructor": function Element(tag, attributes, text) {
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
                /**
                 * @description Procura um elemento por ID.
                 * @param {String} id
                 * @returns {HTMLElement} Elemento encontrado.
                 */
                "get": document.getElementById,
                /**
                 * @description Procura um elemento por seletor CSS em um parent.
                 * @param {String} selector
                 * @param {HTMLElement} [parent=document] Elemento no qual realizar busca. 
                 * @returns {HTMLElement} Elemento encontrado.
                 */
                "query": function queryElement(selector, parent) {
                    var node;
                    if (parent instanceof HTMLElement) {
                        node = parent;
                    } else {
                        node = document;
                    }
                    return node.querySelector(selector);
                },
                /**
                 * @description Procura elementos por seletor CSS em um parent.
                 * @param {String} selector
                 * @param {HTMLElement} [parent=document] Elemento no qual realizar busca. 
                 * @returns {Array.<HTMLElement>} Elementos encontrados.
                 */
                "queryAll": function queryElements(selector, parent) {
                    var node;
                    if (parent instanceof HTMLElement) {
                        node = parent;
                    } else {
                        node = document;
                    }
                    return node.querySelectorAll(selector);
                }
            };
        }
    }
)(window);