import CodeMirror from 'codemirror';
import MirrorConsole from 'codemirror-console';

class AppController {
    constructor($http, $element) {
        this.$http = $http;
        this.$element = $element;
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
        this.$http.post('http://localhost:8090/code',{code:this.editor.getValue()})
            .then(response => {
                this.$outputEl.html(response.data.result);
            });
        /*const code = this.editor.getValue();
        const scriptTag = angular.element('<script/>', { text: code });
        this.$element.append(scriptTag);*/
    }
}

AppController.$onInit = [
    '$http',
    '$element'
];

export default AppController;

