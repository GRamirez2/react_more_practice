var React = require("react");

var History = React.createClass({

render: function(){
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title text-center">Search History</h3>
            </div>
                <div className="panel-body text-center">

                {this.props.history.map(function(search){
                    return (
                        <p>{search.search} - {search.userCreated}</p>
                    )
                })}
                </div>
        </div>
    );
  }
});

module.exports = History;