// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper Function
var helpers = require("./utils/helpers.js");

// This is the main component.
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
  },

  componentDidMount: function() {
    helpers.getHistory().then(function(response) {
      console.log("Main ln 22 ", response);
      if (response !== this.state.history) {
        console.log("Mln24 History", response.data);
        this.setState({ history: response.data })
      }
    }.bind(this));
  },

  // If the component updates we'll run this code
  componentDidUpdate: function() {

    // if (prevState.searchTerm !== this.state.searchTerm) {
    //   console.log("UPDATED");
    //   console.log("M ln 56"+this.state.searchTerm);

          helpers.runQuery(this.state.searchTerm).then(function(data) {
            if (data !== this.state.results) {
              console.log("Main ln 46, ", data);
              this.setState({ results: data });

                 helpers.saveSearch(this.state.searchTerm).then(function(){
                    console.log("Posted to MongoDB, line 26 Main");

                      helpers.getHistory().then(function(response) {
                        this.setState({ history: response.data })

            // This code is necessary to bind the keyword "this" when we say this.setState
            // to actually mean the component itself and not the runQuery function.

          }.bind(this));

        }.bind(this));
        
      };
    }.bind(this));
  },
  // We use this function to allow children to update the parent with searchTerms.
  setTerm: function(term) {
    console.log("term 57", term)
    this.setState({ searchTerm: term });
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2 className="text-center">George this is finally  working!!</h2>
            <p className="text-center">
              <em>George ENTER a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>

        </div>

        <div className = "row">
          <History history={this.state.history} />
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;