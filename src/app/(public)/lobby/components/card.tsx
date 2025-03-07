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
  // __RENDER
  return (
    <figure className='card relative rounded'>
      <div className='card-poster'>
        <picture>
          <img className='size-full object-cover object-center' src={poster} alt={title} />
        </picture>
      </div>

      <div className='card-tags'>
        <i className='tag'>new</i>
      </div>

      <div className='card-content'>
        <figcaption className='title line-clamp-2 text-xl font-bold' title={title}>
          {title}
        </figcaption>

        {rest?.desc && <p className='desc mt-2 line-clamp-3'>{rest.desc}</p>}

        <button
          className='bg-foreground mx-auto mt-4 h-8 cursor-pointer rounded px-4'
          type='button'
          onClick={rest.onClick}>
          <span className='text-background text-xs font-bold uppercase'>watch now</span>
        </button>
      </div>
    </figure>
  )
}
