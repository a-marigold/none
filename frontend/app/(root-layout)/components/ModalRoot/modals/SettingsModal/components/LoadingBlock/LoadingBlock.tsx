import LoadingSpinner from '@/UI/LoadingSpinner';

import loadingStyles from './LoadingBlock.module.scss';

export default function LoadingBlock() {
    return (
        <div className={loadingStyles['loading-block']}>
            <LoadingSpinner />
        </div>
    );
}
