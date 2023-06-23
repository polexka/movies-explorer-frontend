import './More.css'

function More({ loadMore }) {
  return (
    <div className='more'>
      <button
        className='button 
      more__button'
        type='button'
        onClick={loadMore}
      />
    </div>
  );
}

export default More;