import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Upload from './upload';
import {UploadFile} from './upload';

const defaultFileList: UploadFile[] = [
	{uid: '123', size: 1234, name: '1.md', status: 'uploading', percent: 30},
	{uid: '132', size: 1234, name: '2.md', status: 'success', percent: 30},
	{uid: '312', size: 1234, name: '3.md', status: 'error', percent: 30}
];

const checkFileSize = (file: File) => {
	const size = Math.round(file.size / 1025) > 50;
	if (size) {
		console.log('file too big');
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
			action="https://run.mocky.io/v3/4abfbf28-0afc-45f1-b8ae-219f82fe51d8"
			defaultFileList={defaultFileList}
			onChange={action('change')}
			beforeUpload={filePromise}
		/>
	);
};

storiesOf('Upload component', module).add('Upload', SimpleUpload);
