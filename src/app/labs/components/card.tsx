export function CardComponent({
  poster,
  title,
  ...rest
}: Readonly<{
  poster: string
  title: string
  desc?: string
  onClick?: () => void
}>) {
  // __STATE's

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <figure className='ui--card relative rounded'>
      <div className='ui--card-poster'>
        <picture>
          <img className='size-full object-cover object-center' src={poster} alt={title} />
        </picture>
      </div>

      <div className='ui--card-tags'>
        <i className='tag'>new</i>
      </div>

      <div className='ui--card-content'>
        <figcaption className='title line-clamp-2 text-xl font-bold' title={title}>
          {title}
        </figcaption>

        {rest?.desc && <p className='desc mt-2 line-clamp-3'>{rest.desc}</p>}

        <button className='btn btn-primary btn-watch mt-4' type='button' onClick={rest.onClick}>
          <span className='text-xs font-bold uppercase'>watch now</span>
        </button>
      </div>
    </figure>
  )
}
