import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Upload from './upload';
import {UploadFile} from './upload';
import Button from '../Button/button';
// import Dragger from './dragger';

const defaultFileList: UploadFile[] = [
    {uid: '123', size: 1234, name: '1.md', status: 'uploading', percent: 30},
    {uid: '132', size: 1234, name: '2.md', status: 'success', percent: 30},
    {uid: '312', size: 1234, name: '3.md', status: 'error', percent: 30}
];

const checkFileSize = (file: File) => {
    const size = Math.round(file.size / 1025) > 50;
    if (size) {
        alert('file too big');
        return false;
    }
    return true;
};

const filePromise = (file: File) => {
    const newFile = new File([file], file.name, {type: file.type});
    return Promise.resolve(newFile);
};

const SimpleUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // defaultFileList={defaultFileList}
            onChange={action('change')}
            beforeUpload={filePromise}
            name="fileName"
            data={{key: 'value'}}
            headers={{'X-Powered-Body': 'upload-ship'}}
            accept=".jpg"
            multiple
        >
            <Button btnType="primary">Upload File</Button>
        </Upload>
    );
};

const CheckFileSizeUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={action('changed')}
            beforeUpload={checkFileSize}
        >
            <Button btnType="primary">Upload File</Button>
        </Upload>
    );
};

const DragUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            drag
            onChange={action('changed')}
            beforeUpload={filePromise}
        >
            点击或者拖动到此区域进行上传
        </Upload>
    );
};
storiesOf('Upload component', module)
    .add('Upload', SimpleUpload)
    .add('检查文件大小', CheckFileSizeUpload)
    .add('DragUpload', DragUpload);
