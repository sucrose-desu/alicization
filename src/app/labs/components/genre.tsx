export function GenreComponent() {
  // __STATE's

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <ul className='flex flex-row flex-wrap gap-2 overflow-hidden pt-2'>
      {[].map((genre, index) => (
        <li className='rounded-md bg-rose-900/10 px-2 py-1' key={index}>
          <span className='text-xs font-medium capitalize italic text-rose-500'>{genre}</span>
        </li>
      ))}
    </ul>
  )
}
