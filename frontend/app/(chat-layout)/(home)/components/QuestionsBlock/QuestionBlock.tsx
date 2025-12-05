import { HOME_PHRASE } from '@/constants/homePhrases';

import questionStyles from './QuestionBlock.module.scss';

export default function QuestionBlock() {
    return (
        <div className={questionStyles['question-block']}>
            <h1 className={questionStyles['title']}> {HOME_PHRASE} </h1>
        </div>
    );
}
