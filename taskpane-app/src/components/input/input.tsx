import React from 'react';
import { useId, Input, InputOnChangeData, Label } from '@fluentui/react-components';
import { useStyles } from './styles';

type InputWrapperProps = {
  updateText: (value: string) => void;
  value: string;
  label: string;
}

export const InputWrapper = (props: InputWrapperProps) => {
  const styles = useStyles();
  const htmlId = useId();
  return <>
    <Label htmlFor={htmlId}><b>{props.label}</b></Label>
    <Input
      type='text'
      role='textbox'
      id={htmlId}
      className={styles.inputStyles}
      value={props.value}
      placeholder="Type something or select from your document"
      onChange={(e: any, d: InputOnChangeData) => props.updateText(d.value)}/>
  </>
}