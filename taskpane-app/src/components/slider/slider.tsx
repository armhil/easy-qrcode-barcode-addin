import React, { useMemo } from 'react';
import { useId, Slider, Label, SliderOnChangeData } from '@fluentui/react-components';
import { useSliderStyles } from './styles';

type SliderProps = {
  label: string;
	value: number;
	setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  vertical?: boolean;
}

export const SliderWrapper = (props: SliderProps) => {
  const htmlId = useId();
  const styles = useSliderStyles();
  return useMemo(() => <div>
    <Label htmlFor={htmlId}>{props.label}</Label>
    <div>
    <Slider
      vertical={props.vertical}
      key={htmlId}
      id={htmlId}
      className={styles.slider}
      as='input' 
      onChange={(ev: any, d: SliderOnChangeData) => props.setValue(d.value)} 
      min={props.min} max={props.max}
      value={props.value} />
    </div>
  </div>, 
  [props]);
}