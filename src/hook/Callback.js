import React from 'react'


export default () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const handleClickButton1 = () => {
        setCount1(count1 + 1);
    };

    const handleClickButton2 = useCallback(() => {
        setCount2(count2 + 1);
    }, [count2]);

    return (
        <div>
            <div>
                <Button onClickButton={handleClickButton1}>Button1</Button>
            </div>
            <div>
                <Button onClickButton={handleClickButton2}>Button2</Button>
            </div>
        </div>
    );
}

const Button = React.memo(({ onClickButton, children }) => {
    return (
        <>
            <button onClick={onClickButton}>{children}</button>
            <span>{Math.random()}</span>
        </>
    );
})
