import React, { Component } from 'react';
import { Container, Row, Col, TooltTip } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

class MatchedUUID extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            totalBlocks: this.props.countHeader.txCount,
            dialogOpen: false
        }
    }

    convertTime = date => {
        var hold = new Date(date);
        var hours = hold.getHours();
        var minutes = hold.getMinutes();
        var strTime = hours + ":" + minutes + "GMT";
        return strTime;
    }

    handleDialogOpen = tid => {
        this.props.getTransactionInfo(this.props.channel.currentChannel, tid);
        this.setState({ dialogOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ totalBlocks: this.props.countHeader.txCount });
    }

    componentDidMount() {
        setInterval(() => {
            this.props.getUUIDStatusList(this.props.channel.currentChannel);
        }, 6000)
    }

    render() {
        const columnHeaders = [
            {
                Header: "UUID",
                accessor: "id",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["payload"] }, { threshold: matchSorter.rankings.SIMPLEMATCH }),
                filterAll: true
            },
            {
                Header: "Request Created At",
                accessor: "reqcreatedt",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["createdt"] }, { threshold: matchSorter.rankings.SIMPLEMATCH }),
                filterAll: true
            },
            {
                Header: "Response",
                accessor: "respayload",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["payload"] }, { threshold: matchSorter.rankings.SIMPLEMATCH }),
                filterAll: true
            },
            {
                Header: "Response Created At",
                accessor: "rescreatedt",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["createdt"] }, { threshold: matchSorter.rankings.SIMPLEMATCH }),
                filterAll: true
            }
        ];

        return (
            <div className="blockPage">
                <Container>
                    <Row>
                        <Col>
                            <div className="scrollTable">
                                <ReactTable
                                    data={this.props.uuidList}
                                    columns={columnHeaders}
                                    defaultPageSize={10}
                                    className="-stripped -highlight"
                                    filterable
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default MatchedUUID;
