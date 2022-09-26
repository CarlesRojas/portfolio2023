import s from "@styles/components/Controls.module.scss";

interface Control {
    icon: JSX.Element;
    onClick: () => void;
    disabled: boolean;
}

interface ControlsProps {
    controls: Control[];
}

const Controls = ({ controls }: ControlsProps) => {
    return (
        <div className={s.controls}>
            {controls.map(({ icon, onClick, disabled }, i) => (
                <button key={`icon_${i}`} className={`${disabled ? s.disabled : ""}`} onClick={onClick}>
                    {icon}
                </button>
            ))}
        </div>
    );
};

export default Controls;
