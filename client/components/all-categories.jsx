import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategoryCardView } from './category-card.jsx';
import { ErrorMessage } from './index';
import { fetchCategories, addCategory, deleteCategory, newErrorMessage } from '../store/index.js'


export class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      errors: [],
      dirty: false,
    }
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  handleChange = (event, name, description) => {
    let newCategory = this.state.category
    const value = event.target.value;
    let categoryInfo = {
      name: name ? value : newCategory.name,
      description: description ? value : newCategory.description
    }
    this.setState({
      category: categoryInfo,
      dirty: true,
    }, this.validate)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let category = this.state.category
    this.props.createCategory(category)
  }

  validate = () => {
    let errors = [];
    let category = this.state.category
    if (this.state.dirty) {
      if (!category.name.length) errors.push('Category name is required');
    }
    this.setState({
      errors: errors
    })
  }

  render() {
    const { categories, removeCategory, authMessage } = this.props;
    const { category } = this.state
    let disableSubmit = ((this.state.errors && this.state.errors.length) || !this.state.dirty) ? true : false;
    return (
      <div className="center-align">
        {
          authMessage ?
            <h2>{authMessage}</h2>
            :
            <div>
              <h1>ALL CATEGORIES</h1>
              <div>
                <form onSubmit={(event) => { this.handleSubmit(event) }} >
                  <h4>Add a New Category</h4>
                  {
                    this.props.errorMessage.length ?
                    <ErrorMessage
                    errorMessage={this.props.errorMessage}
                    clearError={this.props.clearError}
                    />
                    :
                    <div />
                  }
                  <div className="errorMessage">
                    {
                      this.state.errors.length ?
                        <h5>{this.state.errors.join(`, `)}</h5>
                        :
                        <div />
                    }
                  </div>
                  Category Name: <input required onChange={(evt) => this.handleChange(evt, 'name', null)} name="name" value={category.name} />
                  Category Description: <textarea onChange={(evt) => this.handleChange(evt, null, 'description')} name="description" value={category.description} />
                  <button disabled={disableSubmit}>Add Category</button>
                </form>
              </div>
              <div className="center-align">
                <div className="row">
                  {categories && categories.map(category => {
                    return <CategoryCardView
                      key={category.id}
                      category={category}
                      removeCategory={removeCategory} />
                  })}
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    user: state.user,
    authMessage: state.authMessage,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory(category) {
      dispatch(addCategory(category));
    },
    loadCategories() {
      dispatch(fetchCategories());
    },
    removeCategory(event, categoryId) {
      event.preventDefault()
      dispatch(deleteCategory(categoryId));
    },
    clearError() {
      dispatch(newErrorMessage(''))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCategories);
