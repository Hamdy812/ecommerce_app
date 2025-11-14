
class Apifeatures{
 constructor(mongosequery,querystr){
    this.mongosequery=mongosequery;
    this.querystr=querystr;
 }

  filter(){
    //filter with =
  const queryobj = { ...this.querystr };
  const fields = ["page", "sort", "limit", "fields", "keyword"];
  fields.forEach((field) => delete queryobj[field]);

  //filter with(>,<)
  let qerystr = JSON.stringify(queryobj);
  qerystr = qerystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  this.mongosequery=this.mongosequery.find(JSON.parse(qerystr))
  return this;
  }

  sort(){
    
  if (this.querystr.sort) {
    const sortby = this.querystr.sort.split(",").join(' ');
   this.mongosequery = this.mongosequery.sort(sortby);

  }
  return this;
  }

  limitField(){
    
  if (this.querystr.fields) {
    const selectedFields = this.querystr.fields.split(",").join(' ');
    this.mongosequery = mongosequery.select(selectedFields);
  } else {
    this.mongosequery = this.mongosequery.select('-__v');
  }
  return this;
  }

  search(){
    if (this.querystr.keyword) {
      const query = {
        $or: [
          { title: { $regex: this.querystr.keyword, $options: "i" } },
          { description: { $regex: this.querystr.keyword, $options: "i" } }
        ]
      };
      this.mongosequery = this.mongosequery.find(query);
    }
    return this;
  }

  paginitaion(countdoc){
    
  const page = this.querystr.page * 1 || 1;
  const limit = this.querystr.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const endindex=page*limit;

      const paginat={};
      paginat.currentPage=page;
      paginat.limit=limit;
      paginat.numberOfPages=Math.ceil(countdoc/limit);
      
      if (endindex<countdoc) {
        paginat.next=page+1;
      }

      if (skip>0) {
        paginat.prev=page-1;
      }
     this.mongosequery=this.mongosequery.skip(skip)
    .limit(limit);
     this.paginatresult=paginat;
    return this;
  }
}

module.exports=Apifeatures