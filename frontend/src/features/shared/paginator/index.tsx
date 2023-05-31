import * as React from 'react'

interface PaginatorProps {
  total: number,
  currentPage: number,
  perPage: number,
  onClick: (e: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({ total, currentPage, perPage, onClick }):JSX.Element => {
  const numberOfPages = total > perPage ? Math.floor(total / perPage) : 0
  
  const handleArrowClick = (e: React.MouseEvent<HTMLButtonElement>, direction: string) => {
    e.preventDefault()
    if (direction === 'left') {
      if ((currentPage - 1) >= 0 ) {
        onClick(e, currentPage - 1)
      }
    } else {
      if ((currentPage + 1) <= numberOfPages) {
        onClick(e, currentPage + 1)
      }
    }
  }

  const generatePageButtons = (): React.ReactNode => {
    let pageButtons = []
    if (numberOfPages) {
      for ( let i = 0; i <= numberOfPages; i++) {
        let classes = currentPage === i ? 'paginator-button active' : 'paginator-button'
        pageButtons.push(
          <button
            key={`paginator__${i}`}
            className={classes}
            onClick={(e) => onClick(e, i)}
          >
            {i + 1}
          </button>
        )
      }
    }
    return pageButtons
  }

  return (
    <div className='paginator'>
      <button
        disabled={(currentPage === 0) ? true : false }
        className={ (currentPage === 0) ? 'paginator-arrow left deactivate' : 'paginator-arrow left'}
        onClick={(e) => handleArrowClick(e, 'left')}>
      </button>
      <div className='paginator-page-buttons'>
        {generatePageButtons()}
      </div>
      <button 
        disabled={(currentPage === numberOfPages) ? true : false }
        className={ (currentPage === numberOfPages) ? 'paginator-arrow right deactivate' : 'paginator-arrow right'}
        onClick={(e) => handleArrowClick(e, 'right')}>
      </button>
    </div>
  )
}

export default Paginator