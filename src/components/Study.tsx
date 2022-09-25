import s from "@styles/components/Study.module.scss";

export interface StudyProps {
    degreeTitle: string;
    educationCenter: string;
    years: string;
}

const Study = ({ degreeTitle, educationCenter, years }: StudyProps) => {
    return (
        <div className={s.study}>
            <h1>{degreeTitle}</h1>
            <p>{educationCenter}</p>
            <small>{years}</small>
        </div>
    );
};

export default Study;
