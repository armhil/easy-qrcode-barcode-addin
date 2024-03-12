import React from 'react';
import { useId, Slider, Label, SliderOnChangeData } from '@fluentui/react-components';
import { useSliderStyles } from './styles';

type SliderProps = {
  label: string;
	value: number;
	setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export const SliderWrapper = (props: SliderProps) => {
  const htmlId = useId();
  const styles = useSliderStyles();
  return <div>
    <Label htmlFor={htmlId}>{props.label}</Label>
    <div>
    <Slider
      id={htmlId} 
      className={styles.padded}
      onChange={(ev: any, d: SliderOnChangeData) => props.setValue(d.value)} 
      min={props.min} max={props.max} 
      value={props.value} />
    </div>
  </div>
}