import { redirect } from 'next/navigation';

/* پنل فقط صندوق پیام‌ها را دارد */
export default function AdminHome() {
  redirect('/admin/messages');
}
