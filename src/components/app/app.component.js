import CodeMirror from 'codemirror';
import MirrorConsole from 'codemirror-console';

class AppController {
    constructor($http, $element) {
        this.$http = $http;
        this.$element = $element;
        this.url = 'http://localhost:8090/code';
    }

    $onInit() {
        this.$outputEl = this.$element.find('#output');
        this.outputEl = this.$element.find('#output')[0];
        this.editorEl = this.$element.find('#editor')[0];
        this.editorConfig = {
            lint: { esversion: 6 },
            lineNumbers: true,
            mode: 'javascript',
            theme: 'blackboard',
            runnable: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            scrollbarStyle: 'null',
            lineWrapping: true,
            gutters: ['CodeMirror-lint-markers']
        }
        this.editor = CodeMirror.fromTextArea(this.editorEl, this.editorConfig);
    }

    run() {
        const codeConfig = {
            code: this.editor.getValue(),
            id: 1
        };
        console.log(JSON.stringify(codeConfig));
        /*this.$http
            .post(this.url, codeConfig)
            .then(this.handleSuccess)
            .catch(this.handleError)*/
    }

    handleSuccess(response){
        console.log(response.data)
    }

    handleError(rejection){
        console.log(rejection)
    }
}

AppController.$onInit = [
    '$http',
    '$element'
];

export default AppController;

