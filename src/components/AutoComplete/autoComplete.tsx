import React, {FC, useState, useEffect, useRef, ChangeEvent, ReactElement, KeyboardEvent} from 'react';
import classNames from 'classnames';
import Input, {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';

interface DataSourceObject {
	value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
	fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
	onSelect?: (item: string) => void;
	renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ~~~js
 * import { AutoComplete } from 'vikingship'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = props => {
	const {fetchSuggestions, onSelect, renderOption, value, style, ...restProps} = props;

	const [inputValue, setInputValue] = useState(value as string);

	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

	const [loading, setLoading] = useState(false);

	const [showDropdown, setShowDropdown] = useState(false);

	const [highlightIndex, setHighlightIndex] = useState(-1);

	const triggerSearch = useRef(false);

	const componentRef = useRef<HTMLDivElement>(null);

	const debounceValue = useDebounce(inputValue, 500);

	useClickOutside(componentRef, () => {
		setSuggestions([]);
	});

	useEffect(
		() => {
			if (debounceValue && triggerSearch.current) {
				setSuggestions([]);
				const result = fetchSuggestions(debounceValue);
				if (result instanceof Promise) {
					setLoading(true);
					result.then(res => {
						setLoading(false);
						setSuggestions(res);
						if (res.length > 0) {
							setShowDropdown(true);
						}
					});
				} else {
					setSuggestions(result);
					setShowDropdown(true);
					if (result.length > 0) {
						setShowDropdown(true);
					}
				}
			} else {
				setShowDropdown(false);
			}
			setHighlightIndex(-1);
		},
		[debounceValue, fetchSuggestions]
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		setInputValue(value);
		triggerSearch.current = true;
	};

	const highlight = (index: number) => {
		if (index < 0) index = 0;
		if (index >= suggestions.length) {
			index = suggestions.length - 1;
		}
		setHighlightIndex(index);
		triggerSearch.current = false;
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.keyCode) {
			case 13: // Enter
				suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex]);
				break;
			case 38: // 上
				highlight(highlightIndex - 1);
				break;
			case 40: // 下
				highlight(highlightIndex + 1);
				break;
			case 27: // Esc
				setShowDropdown(false);
				break;
			default:
				break;
		}
	};

	const handleSelect = (item: DataSourceType) => {
		setInputValue(item.value);
		setShowDropdown(false);
		if (onSelect) {
			onSelect(item.value);
		}
		triggerSearch.current = false;
	};

	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item.value;
	};

	const generateDropdown = () => {
		return (
			<Transition
				in={showDropdown || loading}
				timeout={300}
				animation="zoom-in-top"
				onExited={() => {
					setSuggestions([]);
				}}
			>
				<ul className="suggestion-list">
					{loading && (
						<div className="suggestions-loading-icon">
							<Icon icon="spinner" spin />
						</div>
					)}
					{suggestions.map((item, index) => {
						const classes = classNames('suggestion-item', {
							'is-active': index === highlightIndex
						});
						return (
							<li key={index} onClick={() => handleSelect(item)} className={classes}>
								{renderTemplate(item)}
							</li>
						);
					})}
				</ul>
			</Transition>
		);
	};

	return (
		<div className="auto-complete" style={style} ref={componentRef}>
			<Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
			{suggestions.length > 0 && generateDropdown()}
		</div>
	);
};

export default AutoComplete;
