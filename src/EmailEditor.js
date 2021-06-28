import React, { useRef } from 'react';
import { render } from 'react-dom';
import axios from "axios";
import EmailEditors from 'react-email-editor';
// import Preview from './Preview'
import { Base64 } from 'js-base64';
import grabzit from 'grabzit'

// const emailEditorRef = useRef(null);
class EmailEditor extends React.Component {
    emailEditorRef = React.createRef()
    constructor(props) {
        super(props)
    }



    exportHtml = () => {
        console.log(this.emailEditorRef)
        this.emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    };

    preview = () => {



        let htmlCode;
        this.emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            htmlCode = html;
            console.log('exportDesign', design)
            console.log('exportHtml', html);
        });
        // return (
        //     <Preview htmlCode={htmlCode} />
        // )
    }

    onLoad = () => {
        // you can load your template here;
        let responses
        axios
            .get("http://10.171.231.91:1337/default-templates")
            .then(response => {
                responses = response.data
                console.log(response.data)
                let templateJson = response.data[0].design;
                console.log(templateJson)
                this.emailEditorRef.current.editor.loadDesign(templateJson);

            }).catch(function (error) {
                // manipulate the error response here
            });


        var bodyFormData = new FormData();
        bodyFormData.append('html', '%3Ch1%3EConvert%20Me%21%3C%2Fh1%3E');
        bodyFormData.append('key', 'MWY1ZjU1NDkxZjg0NDgwMGE0YjQ3MzlhZDgyNTRkMzU=');
        axios({
            method: "post",
            url: "https://api.grabz.it/services/convert.ashx",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

        var client = new grabzit("MWY1ZjU1NDkxZjg0NDgwMGE0YjQ3MzlhZDgyNTRkMzU=", "M3AcP312Pz8/ej8/Cj8/QQE/XRoxFx0/P30/Pz8WPz8=");
        client.html_to_image("%3Ch1%3EConvert%20Me%21%3C%2Fh1%3E", function (err, result) {
            // file.writeFile('test.jpg', result);
            console.log(result)
        });
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.preview()}>View Preview</button>
                    <button onClick={() => this.exportHtml()}>Export HTML</button>
                </div>

                <EmailEditors ref={this.emailEditorRef} onLoad={() => this.onLoad()} options={{}} minHeight="700px" />
            </div>
        );
    }
}
export default EmailEditor
