import CodeMirror from 'codemirror';
import MirrorConsole from 'codemirror-console';

class AppController {
    constructor($element) {
        this.$element = $element;
    }

    $onInit() {
        this.outputEl = this.$element.find('#output')[0];
        this.editorEl = this.$element.find('#editor')[0];
        this.editorConfig = {
            lineNumbers: true,
            mode: {
                name: 'javascript',
                json: true
            },
            theme: 'blackboard'
        }
        this.editor = CodeMirror.fromTextArea(this.editorEl, this.editorConfig);
    }

    run() {
        const code = this.editor.getValue();

        const scriptTag = angular.element('<script/>', {text:code});

        this.$element.append(scriptTag);

        /*const tempEditor = new MirrorConsole();
        tempEditor.setText(this.editorEl.textContent);
        tempEditor.swapWithElement(this.editorEl);
        var consoleMock = {
            log: function (arg) {
                function line(text) {
                    var div = document.createElement("div");
                    div.appendChild(document.createTextNode(text));
                    return div;
                }
                this.outputEl.appendChild(line(arg));
            }
        }
        // eval code
        tempEditor.runInContext({ console: consoleMock }, function (error, result) {
            if (error) {
                console.error(error);
            }
        });
        tempEditor.destroy();// remote editor*/
    }
}

AppController.$onInit = [
    '$element'
];

export default AppController;

