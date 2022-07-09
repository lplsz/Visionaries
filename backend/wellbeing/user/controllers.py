def delete_qualification_by_id(category_id):
    db.session.delete(Category.query.filter_by(id=category_id).first_or_404(description='Category Not Found'))
    db.session.commit()
    return {'message': 'Category Deleted'}
