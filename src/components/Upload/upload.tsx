import React, {FC, useRef, ChangeEvent, useState} from 'react';
// import classNames from 'classnames';
import axios from 'axios';
import Button from '../Button/button';
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
	action: string;
	defaultFileList?: UploadFile[];
	beforeUpload?: (file: File) => boolean | Promise<File>;
	onProgress?: (percentage: number, file: File) => void;
	onSuccess?: (data: any, file: File) => void;
	onError?: (err: any, file: File) => void;
	onChange?: (file: File) => void;
	onRemove?: (file: UploadFile) => void;
}

export const Upload: FC<UploadProps> = props => {
	const {action, defaultFileList, beforeUpload, onProgress, onSuccess, onError, onChange, onRemove} = props;

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
		setFileList([_file, ...fileList]);
		const formData = new FormData();
		formData.append(file.name, file);
		axios
			.post(action, formData, {
				headers: {
					'Content-type': 'multipart/form-data'
				},
				onUploadProgress: e => {
					let percentage = Math.round(e.loaded * 100 / e.total) || 0;
					uploadFileList(_file, {percent: percentage, status: 'uploading'});
					if (percentage < 100 && onProgress) {
						onProgress(percentage, file);
					}
				}
			})
			.then(res => {
				console.log(res);
				uploadFileList(_file, {status: 'success', response: res.data});
				onSuccess && onSuccess(res.data, file);
				onChange && onChange(file);
			})
			.catch(err => {
				console.log(err);
				uploadFileList(_file, {status: 'error', error: err});
				onError && onError(err, file);
				onChange && onChange(file);
			});
	};
	console.log(fileList);
	return (
		<div className="upload-component">
			<Button btnType="primary" onClick={handleClick}>
				Upload File
			</Button>
			<input
				type="file"
				className="file-input"
				style={{display: 'none'}}
				ref={fileInput}
				onChange={handleFileChange}
			/>
			<UploadList fileList={fileList} onRemove={handleRemove} />
		</div>
	);
};

export default Upload;
