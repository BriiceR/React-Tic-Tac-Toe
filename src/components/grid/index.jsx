
import './index.css';

const Grid = ({ value, onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
};

export default Grid;