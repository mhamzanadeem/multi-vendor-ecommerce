require('dotenv').config({ path: require('node:path').join(__dirname, '../backend/config/.env') });
const mongoose = require('mongoose');
const Shop = require('../backend/model/shop');
const User = require('../backend/model/user');
const Coupon = require('../backend/model/coupounCode');
const Product = require('../backend/model/product');

async function main() {
  const url = new URL(process.env.DB_URL);
  if (url.pathname !== '/guardian_demo') throw new Error('Seed only accepts database guardian_demo.');
  if (!process.env.DEMO_PASSWORD || process.env.DEMO_PASSWORD.length < 12) throw new Error('Set DEMO_PASSWORD to at least 12 characters.');
  await mongoose.connect(url.href, { serverSelectionTimeoutMS: 5000 });
  const avatar = { public_id: 'guardian-demo', url: '/demo-product.svg' };
  for (const label of ['a', 'b']) {
    const email = `seller-${label}@example.test`;
    let shop = await Shop.findOne({ email });
    if (!shop) shop = await Shop.create({ name: `Fictional Seller ${label.toUpperCase()}`, email,
      password: process.env.DEMO_PASSWORD, address: 'Demo street', phoneNumber: 1000000000, zipCode: 10000, avatar });
    const name = `Guardian demo product ${label}`;
    if (!await Product.exists({ name, shopId: String(shop._id) })) await Product.create({ name,
      description: 'Fictional product for hackathon testing', category: 'Others', discountPrice: 100, stock: 20,
      images: [avatar], shopId: String(shop._id), shop: { _id: shop._id, name: shop.name, avatar: shop.avatar, address: shop.address } });
    if (label === 'b' && !await Coupon.exists({ name: 'GUARDIAN_DEMO_B' })) await Coupon.create({
      name: 'GUARDIAN_DEMO_B', value: 10, shopId: String(shop._id) });
    const customerEmail = `customer-${label}@example.test`;
    if (!await User.exists({ email: customerEmail })) await User.create({ name: `Fictional Customer ${label}`,
      email: customerEmail, password: process.env.DEMO_PASSWORD, avatar });
  }
  console.log('Demo fixtures ready. Existing records and passwords were preserved.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => mongoose.disconnect());
