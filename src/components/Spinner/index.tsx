import React from 'react';

import logo from './spinner.svg';

import { i18n } from '../../utils/i18n';

import './style.css';

const messagesList = ['Loading.First', 'Loading.Second', 'Loading.Third'];

function Spinner() {
  const [index, setIndex] = React.useState<number>(0);
  const [text, setText] = React.useState<string>(i18n(messagesList[0]));

  const changeSpinnerText = React.useCallback(() => {
    const newIndex = index + 1;
    setText(i18n(messagesList[newIndex]));
    setIndex(newIndex);
  }, [index]);

  React.useEffect(() => {
    const intervalID = setInterval(changeSpinnerText, 3 * 1000);
    if (index >= messagesList.length - 1) {
      clearInterval(intervalID);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [changeSpinnerText, index]);

  const setSpinnrtTextError = React.useCallback(() => {
    setText(i18n('Error.Timeout'));
  }, []);

  React.useEffect(() => {
    const timeoutID = setTimeout(setSpinnrtTextError, 10 * 1000);
    return () => clearInterval(timeoutID);
  }, [setSpinnrtTextError]);

  return (
    <div className="spinner">
      <img src={logo} className="spinner-img" alt="spinner" />
      <p className="spinner-text">{text}</p>
    </div>
  );
}

export default Spinner;
