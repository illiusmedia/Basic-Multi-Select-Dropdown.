/******************************* PROPS ******************************
* input: this.props.options (array)                                *
* array: {index: int, value: string, label: string, checked: bool} *
* bubbles: this.props.onChange()                                   *
* class: string, this.props.class                                  *
* dropup: string bool, this props.dropup                           *
*******************************************************************/

import { Component } from 'react';

class BasicMultiSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dropup: this.props.dropup === 'true' ? 'dropup' : ''
        }
    }

    onChangeHandler = (clickedRow) => {
        let newListOfRows = [];
        this.props.options.forEach((row) => {
            if (row.value === clickedRow.value) {
                row.checked = !clickedRow.checked;
            }
            newListOfRows.push(row);
        });

        this.props.onChange(newListOfRows);
    }

    toggleDropdown = (e) => {
        e.persist();
        if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'LABEL')
            return;

        this.setState({ open: !this.state.open });
    }

    isFloat = (n) => {
        return Number(n) === n && n % 1 !== 0;
    }

    render() {
        const dropDownButtonClasses = 'btn btn-outline-secondary btn-sm dropdown-toggle ' + (this.state.open ? 'active' : '');
        const dropDownMenuClasses = 'dropdown-menu pre-scrollable dropdown-menu-right ' + (this.state.open ? 'show' : '');

        return (
            <div className={this.props.class + ' btn-group btn-group-sm ' + this.state.dropup} id="basicMultiSelectDropdown" onClick={(e) => this.toggleDropdown(e)}>
                <button className={dropDownButtonClasses}><i className="fa fa-columns" aria-hidden="true"></i> Columns<i className="caret"></i></button>
                <ul className={dropDownMenuClasses} style={{ 'padding': 0 }}>
                    {
                        this.props.options && this.props.options.length > 0 &&
                            this.props.options.map((row, index) => {
                                const labelStyle = {
                                    'backgroundColor': this.isFloat(index / 2)
                                        ? '#ffffff'
                                        : '#f8f9fa',
                                    'margin': 0,
                                    'paddingTop': '5px',
                                    'paddingBottom': '5px',
                                    'color': 'black'
                                };

                                return (
                                    <label style={labelStyle} className="dropdown-item label pointer" key={row.index} htmlFor={'checkbox-' + row.index}>
                                        <input type="checkbox" onChange={() => this.onChangeHandler(row)} defaultChecked={row.checked} className="form-check-input pointer" id={'checkbox-' + row.index} /> {row.label}
                                    </label>
                                );
                            })
                    }
                </ul>
            </div>
        );
    }
}

export default BasicMultiSelectDropdown;
