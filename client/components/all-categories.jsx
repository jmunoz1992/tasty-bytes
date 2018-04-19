import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategoryCardView } from './category-card.jsx';
import { fetchCategories, addCategory, deleteCategory } from '../store/index.js'


export class AllCategories extends Component {
  constructor (props) {
    super(props);
    this.state = {
      category: {}
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
      category: categoryInfo
    })
}

handleSubmit = (event) => {
    event.preventDefault();
    let category = this.state.category
    this.props.createCategory(category)
}

  render() {
    const { categories, removeCategory, createCategory } = this.props;
    const { category } = this.state
    return (
      <div className="center-align">

        <h1>ALL CATEGORIES</h1>
        <div>
          <form onSubmit={(event) => {this.handleSubmit(event)}} >
          <h4>Add a New Category</h4>
            Category Name: <input required onChange={(evt) => this.handleChange(evt, 'name', null)} name="name" value={category.name} />
            Category Description: <textarea onChange={(evt) => this.handleChange(evt, null, 'description')} name="description" value={category.description} />
            <button>Add Category</button>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCategories);
