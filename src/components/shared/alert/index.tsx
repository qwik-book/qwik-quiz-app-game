import { component$, useStyles$ } from '@builder.io/qwik';

export interface AlertProps {
    text: string;
    type: 'warning' | 'success' | 'danger'
}
import alertStyles from './style.css?inline';
export const Alert = component$<AlertProps>((data: AlertProps) => {
    useStyles$(alertStyles);
  return <div class={"alert alert-" + data.type}>{data.text}</div>
});