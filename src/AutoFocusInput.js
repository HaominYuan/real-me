import react, {component} from "react"


class AutoFocusInput extends Component {
    componentDidMount() {
        this.input.focus()
    }


    render() {
        return (
            <input ref={(input) => this.input = input}></input>
        )
    }
}