import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Home,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { categories, products } from './products'

const heroImage = 'https://img.refini.ai/ai-image-combiner/detailed-1-after.webp'

const money = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value)

function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value])
  return [value, setValue]
}

function IconButton({ label, children, className = '', ...props }) {
  return <button className={`icon-button ${className}`} aria-label={label} title={label} {...props}>{children}</button>
}

function Header({ cartCount, onCart, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <div className="announcement"><span>Complimentary worldwide shipping over $150</span><span className="announcement-side">Easy 30-day returns</span></div>
    <header className="header">
      <a className="brand" href="#top" aria-label="NOMA home">NO<span>•</span>MA</a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary">
        <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our approach</a>
        <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
      </nav>
      <div className="header-actions">
        <IconButton label="Search" onClick={onSearch}><Search size={20}/></IconButton>
        <IconButton label={`Shopping bag with ${cartCount} items`} onClick={onCart}>
          <ShoppingBag size={20}/>{cartCount > 0 && <span className="count">{cartCount}</span>}
        </IconButton>
        <IconButton label="Menu" className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</IconButton>
      </div>
    </header>
  </>
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-copy">
      <div className="eyebrow"><Sparkles size={15}/> The Autumn Field Edit</div>
      <h1>Good design.<br/><em>Made to move.</em></h1>
      <p>Considered objects for everyday motion—selected for utility, longevity, and the quiet joy of using them.</p>
      <a className="primary-button" href="#shop">Explore the collection <ArrowRight size={18}/></a>
      <div className="hero-proof"><span>4.8/5 from 2,400+ explorers</span><div className="avatars"><b>A</b><b>M</b><b>K</b><b>+</b></div></div>
    </div>
    <div className="hero-visual">
      <img src={heroImage} alt="Curated outdoor essentials including a backpack, watch, bottle, and running shoes"/>
      <div className="image-note"><span>01</span><div><strong>Field-tested essentials</strong><small>Chosen by people who go</small></div></div>
    </div>
  </section>
}

function ProductCard({ product, onOpen, onQuickAdd, favorite, onFavorite }) {
  return <article className="product-card">
    <div className="product-image" style={{background: product.tone}} onClick={() => onOpen(product)}>
      {product.badge && <span className="badge">{product.badge}</span>}
      <IconButton label={favorite ? 'Remove from favorites' : 'Add to favorites'} className={`favorite ${favorite ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onFavorite(product.id) }}>
        <Heart size={18} fill={favorite ? 'currentColor' : 'none'}/>
      </IconButton>
      <img src={product.image} alt={product.name} loading="lazy"/>
      <button className="quick-add" onClick={(e) => {e.stopPropagation(); onQuickAdd(product)}}>Quick add <Plus size={17}/></button>
    </div>
    <div className="product-info" onClick={() => onOpen(product)}>
      <div><h3>{product.name}</h3><span>{product.category}</span></div>
      <strong>{money(product.price)}</strong>
    </div>
    <div className="rating" aria-label={`${product.rating} out of 5 stars`}><span>★★★★★</span> {product.rating} <small>({product.reviews})</small></div>
  </article>
}

function Shop({ onOpen, onQuickAdd, favorites, onFavorite, searchTerm = '' }) {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Featured')
  const visible = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    if (sort === 'Price: low') list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'Top rated') list = [...list].sort((a,b) => b.rating - a.rating)
    return list
  }, [category, sort, searchTerm])

  return <section className="shop-section" id="shop">
    <div className="section-heading"><div><span className="section-kicker">Shop the edit</span><h2>Objects worth keeping.</h2></div><p>Fewer, better things—picked for the way they work and the way they last.</p></div>
    <div className="shop-tools">
      <div className="category-tabs">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <label className="sort"><SlidersHorizontal size={16}/><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option>Featured</option><option>Price: low</option><option>Top rated</option></select><ChevronDown size={15}/></label>
    </div>
    {visible.length ? <div className="product-grid">{visible.map(product => <ProductCard key={product.id} product={product} onOpen={onOpen} onQuickAdd={onQuickAdd} favorite={favorites.includes(product.id)} onFavorite={onFavorite}/>)}</div> : <div className="empty-results"><Search size={34}/><h3>No pieces found</h3><p>Try a different search or browse all goods.</p><button onClick={() => setCategory('All')}>View everything</button></div>}
  </section>
}

function Story() {
  return <>
    <section className="story" id="story">
      <div className="story-copy"><span className="section-kicker">Our standard</span><h2>Buy once.<br/>Use often.</h2><p>We work with independent makers and thoughtful brands to find gear that earns its place in your life.</p><a href="#journal">How we choose <ArrowRight size={17}/></a></div>
      <div className="principles">
        <div><PackageCheck/><span>01</span><h3>Built for use</h3><p>Materials selected for real life, not just the shelf.</p></div>
        <div><ShieldCheck/><span>02</span><h3>Backed for longer</h3><p>Clear warranties and support when you need it.</p></div>
        <div><Sparkles/><span>03</span><h3>Quietly better</h3><p>Lower-impact choices without the loud claims.</p></div>
      </div>
    </section>
    <section className="journal" id="journal"><div><span>FIELD NOTES · 04</span><h2>The lighter way to pack for three days away.</h2><a href="#top">Read the field note <ArrowRight size={17}/></a></div></section>
  </>
}

function ProductModal({ product, onClose, onAdd }) {
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  useEffect(() => {
    const close = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [onClose])
  return <div className="modal-backdrop" onMouseDown={onClose} role="presentation"><div className="product-modal" role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={e => e.stopPropagation()}>
    <IconButton label="Close product details" className="modal-close" onClick={onClose}><X/></IconButton>
    <div className="modal-image" style={{background: product.tone}}><img src={product.image} alt={product.name}/></div>
    <div className="modal-copy"><span className="section-kicker">{product.category} · ★ {product.rating}</span><h2>{product.name}</h2><div className="modal-price">{money(product.price)}</div><p>{product.description}</p>
      <fieldset><legend>Color <strong>{color}</strong></legend><div className="option-row">{product.colors.map(item => <button key={item} className={color === item ? 'selected' : ''} onClick={() => setColor(item)}>{item}{color === item && <Check size={14}/>}</button>)}</div></fieldset>
      <fieldset><legend>Size <strong>{size}</strong></legend><div className="option-row">{product.sizes.map(item => <button key={item} className={size === item ? 'selected' : ''} onClick={() => setSize(item)}>{item}</button>)}</div></fieldset>
      <div className="modal-actions"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={16}/></button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus size={16}/></button></div><button className="add-button" onClick={() => {onAdd(product, qty, color, size); onClose()}}>Add to bag · {money(product.price * qty)}</button></div>
      <ul className="details-list"><li><Check/> Free worldwide shipping over $150</li><li><Check/> Easy returns within 30 days</li></ul>
    </div>
  </div></div>
}

function Cart({ open, cart, onClose, updateQty, removeItem }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const progress = Math.min(100, (subtotal / 150) * 100)
  return <><div className={`drawer-overlay ${open ? 'show' : ''}`} onClick={onClose}/><aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
    <div className="drawer-head"><div><span>Your edit</span><h2>Shopping bag</h2></div><IconButton label="Close bag" onClick={onClose}><X/></IconButton></div>
    {cart.length ? <>
      <div className="shipping-progress"><div>{subtotal >= 150 ? 'You unlocked complimentary shipping.' : `${money(150 - subtotal)} away from complimentary shipping.`}</div><span><i style={{width: `${progress}%`}}/></span></div>
      <div className="cart-items">{cart.map(item => <div className="cart-item" key={item.key}><img src={item.image} alt={item.name}/><div className="cart-item-copy"><div><h3>{item.name}</h3><button onClick={() => removeItem(item.key)} aria-label={`Remove ${item.name}`}><Trash2 size={15}/></button></div><p>{item.color} · {item.size}</p><div><div className="mini-quantity"><button onClick={() => updateQty(item.key, -1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => updateQty(item.key, 1)}><Plus size={13}/></button></div><strong>{money(item.price * item.qty)}</strong></div></div></div>)}</div>
      <div className="cart-footer"><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Taxes and shipping calculated at checkout.</p><button className="checkout-button" onClick={() => alert('Demo complete — checkout would continue here.')}>Continue to checkout <ArrowRight size={17}/></button><small><ShieldCheck size={14}/> Secure demo checkout</small></div>
    </> : <div className="empty-cart"><ShoppingBag size={38}/><h3>Your bag is ready for something good.</h3><p>Explore useful objects selected to go wherever you do.</p><button onClick={onClose}>Browse the collection</button></div>}
  </aside></>
}

function SearchPanel({ open, onClose, onSelect }) {
  const [term, setTerm] = useState('')
  const results = term ? products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(term.toLowerCase())) : products.slice(0,3)
  useEffect(() => { if (!open) setTerm('') }, [open])
  if (!open) return null
  return <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search products">
    <div className="search-top"><Search/><input autoFocus value={term} onChange={e => setTerm(e.target.value)} placeholder="What are you looking for?"/><IconButton label="Close search" onClick={onClose}><X/></IconButton></div>
    <div className="search-body"><span>{term ? `${results.length} results` : 'Popular right now'}</span>{results.length ? results.map(p => <button key={p.id} onClick={() => {onSelect(p); onClose()}}><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>{p.category} · {money(p.price)}</small></div><ArrowRight/></button>) : <p className="no-search">No match yet. Try “pack”, “watch”, or “runner”.</p>}</div>
  </div>
}

function MobileNav({ cartCount, onCart, onSearch }) {
  return <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#top"><Home/><span>Home</span></a><a href="#shop"><Sparkles/><span>Shop</span></a><button onClick={onSearch}><Search/><span>Search</span></button><button onClick={onCart}><ShoppingBag/>{cartCount > 0 && <i>{cartCount}</i>}<span>Bag</span></button><button><UserRound/><span>Account</span></button></nav>
}

function Footer() {
  return <footer><a className="brand" href="#top">NO<span>•</span>MA</a><p>Considered goods for moving through the world.</p><div><a href="#shop">Shop</a><a href="#story">About</a><a href="mailto:hello@noma.example">Contact</a></div><small>© 2026 NOMA Supply Co. Demo storefront.</small></footer>
}

export default function App() {
  const [cart, setCart] = useStoredState('noma-cart', [])
  const [favorites, setFavorites] = useStoredState('noma-favorites', [])
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const addToCart = (product, qty = 1, color = product.colors[0], size = product.sizes[0]) => {
    const key = `${product.id}-${color}-${size}`
    setCart(current => {
      const exists = current.find(item => item.key === key)
      return exists ? current.map(item => item.key === key ? {...item, qty: item.qty + qty} : item) : [...current, {...product, qty, color, size, key}]
    })
    setCartOpen(true)
  }
  const updateQty = (key, delta) => setCart(current => current.map(item => item.key === key ? {...item, qty: item.qty + delta} : item).filter(item => item.qty > 0))
  const removeItem = key => setCart(current => current.filter(item => item.key !== key))
  const toggleFavorite = id => setFavorites(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  useEffect(() => { document.body.style.overflow = cartOpen || selected || searchOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [cartOpen, selected, searchOpen])

  return <>
    <Header cartCount={cartCount} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)}/>
    <main><Hero/><Shop onOpen={setSelected} onQuickAdd={addToCart} favorites={favorites} onFavorite={toggleFavorite}/><Story/></main>
    <Footer/>
    {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart}/>} 
    <Cart open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} updateQty={updateQty} removeItem={removeItem}/>
    <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={setSelected}/>
    <MobileNav cartCount={cartCount} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)}/>
  </>
}
