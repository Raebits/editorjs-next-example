import React, { Component, useEffect, useRef, useState } from 'react'
import EditorJS, { API, LogLevels } from '@editorjs/editorjs';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Embed from '@editorjs/embed';
//@ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import List from '@editorjs/list';



import Header from '@editorjs/header'; 

interface Editor{

}


const DEFAULT_INITIAL_DATA = ({
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 0
      }
    },
  ]
})

const EDITTOR_HOLDER_ID = 'myeditorjs';

const Editor = (props: Editor) => {
  const isInitialize = useRef<boolean>(false)
  let ejInstance: any = useRef<EditorJS>();
  const [editorData, setEditorData] = useState<any>(DEFAULT_INITIAL_DATA);

  useEffect(() => {
    console.log('now', new Date().getTime())
    if (!ejInstance.current && isInitialize.current === false) {
      isInitialize.current = true
      initEditor();
    }
    return () => {
      // ejInstance?.current?.destroy();
      // ejInstance.current = null;
    }
  }, []);
  // const onEditorChange = async (api: API, event: CustomEvent<any>) => {
  //   this
  //   console.log('Now I know that Editor\'s content changed!', event)
  // }
  const initEditor = () => {
    console.log('x')
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR' as LogLevels,
      // placeholder: 'Let\'s write an awesome story',
      data: editorData,
      onReady: () => {
        // if(!ejInstance?.current)
          ejInstance.current = editor;
      },
      onChange: async (api: API, event: CustomEvent<any>) => {
        // @ts-ignore
        let content = await api.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      tools: { 
        header: Header, 
        image: {
          class: ImageTool,
          config: {
            // endpoints: {
            //   byFile: 'http://localhost:6969/upload', // Your backend file uploader endpoint
            //   // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            // }
            uploader: {
              
            }
          }
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
          }
        }
      },
    });
  };

  return (
    typeof window !== 'undefined' ?
    <React.Fragment>
      <div id={EDITTOR_HOLDER_ID}></div>
    </React.Fragment> : <></>
  );
}

const EditorWrapper = (props: Editor): JSX.Element => {
  // if (typeof window !== 'undefined') {
    return (typeof window !== 'undefined' ? <Editor {...props}/> : <></>)
  // } else {
  //   return <></>
  // }
}

export default Editor;
