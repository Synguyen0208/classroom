import React from 'react';
import CKEditor from 'ckeditor4-react';
function Ckeditor(props) {
    const {change, data, fill}=props;
    return (
        <div>
            <CKEditor
                data={data}
                onChange={(evt) => {
                    change(evt.editor.getData(), fill);
                }}
            />
        </div>
    );
}


export default Ckeditor;