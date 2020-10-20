import React, {FC, useRef, ChangeEvent, useState} from 'react';
// import classNames from 'classnames';
import axios from 'axios';
import Button from '../Button/button';
import Dragger from './dragger';
import UploadList from './uploadList';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**必选参数, 上传的地址 */
    action: string;
    /**上传的文件列表 */
    defaultFileList?: UploadFile[];
    /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**文件上传失败时的钩子 */
    onError?: (err: any, file: UploadFile) => void;
    /**文件状态改变时的钩子，上传成功或者失败时都会被调用 */
    onChange?: (file: UploadFile) => void;
    /**文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /**设置上传的请求头部 */
    headers?: {[key: string]: string};
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外参数 */
    data?: {[key: string]: any};
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**可选参数, 接受上传的文件类型 */
    accept?: string;
    /**是否支持多选文件 */
    multiple?: boolean;
    /**是否支持拖拽上传 */
    drag?: boolean;
}
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'vikingship'
import Dragger from './dragger';
 * ~~~
 */
export const Upload: FC<UploadProps> = props => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children
    } = props;

    const fileInput = useRef<HTMLInputElement>(null);

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const uploadFileList = (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === uploadFile.uid) {
                    return {...file, ...uploadObj};
                } else {
                    return file;
                }
            });
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }

        uploadFiles(files);

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        onRemove && onRemove(file);
    };

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);

        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result) {
                    post(file);
                }
            }
        });
    };

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            size: file.size,
            name: file.name,
            percent: 0,
            raw: file
        };
        setFileList(prevList => {
            return [_file, ...prevList];
        });
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
                headers: {
                    ...headers,
                    'Content-type': 'multipart/form-data'
                },
                withCredentials,
                onUploadProgress: e => {
                    let percentage = Math.round(e.loaded * 100 / e.total) || 0;
                    uploadFileList(_file, {percent: percentage, status: 'uploading'});
                    if (percentage < 100 && onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            })
            .then(res => {
                console.log(res);
                uploadFileList(_file, {status: 'success', response: res.data});
                onSuccess && onSuccess(res.data, _file);
                onChange && onChange(_file);
            })
            .catch(err => {
                console.log(err);
                uploadFileList(_file, {status: 'error', error: err});
                onError && onError(err, _file);
                onChange && onChange(_file);
            });
    };
    console.log(fileList);
    return (
        <div className="upload-component">
            <div className="upload-input" style={{display: 'inline-block'}} onClick={handleClick}>
                {drag ? <Dragger onFile={files => uploadFiles(files)}>{children}</Dragger> : children}
                <input
                    type="file"
                    className="file-input"
                    style={{display: 'none'}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
                <UploadList fileList={fileList} onRemove={handleRemove} />
            </div>
        </div>
    );
};

Upload.defaultProps = {
    name: 'file'
};

export default Upload;
