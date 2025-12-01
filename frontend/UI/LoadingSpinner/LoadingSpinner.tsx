import spinnerStyles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
    size?: number;
}
export default function LoadingSpinner({ size = 20 }: LoadingSpinnerProps) {
    return (
        <svg
            width={size}
            height={size}
            className={spinnerStyles['loading-spinner']}
        >
            <use href='#loading-spinner-icon' />
        </svg>
    );
}
