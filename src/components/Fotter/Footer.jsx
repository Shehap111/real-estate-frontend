'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import heart from '../../../public/images/success.webp'; // تأكد من مسار الصورة
import Link from 'next/link'; // استخدام Link من next
import { useTranslation } from 'react-i18next'; // استيراد useTranslation
import './Footer.css'; 
import whatsapp from '../../../public/images/whatsapp.png'
 // مسار i18n حسب مكان الكمبوننت

const Footer = () => {
    const { t } = useTranslation(); // استخدام الترجمة
    const [heartState, setHeartState] = useState(false);

    const activeHeart = () => {
        setHeartState((prevState) => !prevState);
    };



    const addClassToggel = heartState ? 'onclick-heart' : '';

    return (
        <div className='Footer'>
            {/* الجزء الثاني من الفوتر */}
            <div className='container'>

            <Link
                href="https://wa.me/963987654321?text=ممكن%20استفسار"
                target="_blank"
                rel="noopener noreferrer"
                >
                <div className="whatsApp_img">
                    <Image src={whatsapp} alt="contact us on WhatsApp" width={70} height={70} />
                </div>
            </Link>


                <div className='row foot_contant'>



                    <div className='col-lg-3 col-md-6'>
                        <h3>{t('footer.information')}</h3> {/* الترجمة */}
                        <ul>
                            <li>
                                <Link href='/'>{t('footer.aboutUs')}</Link> {/* الترجمة */}
                            </li>
                            <li>
                                <Link href='/'>{t('footer.services')}</Link> {/* الترجمة */}
                            </li>
                            <li>
                                <Link href='/'>{t('footer.shop')}</Link> {/* الترجمة */}
                            </li>
                            <li>
                                <Link href='/'>{t('footer.contactUs')}</Link> {/* الترجمة */}
                            </li>
                            <li>
                                <Link href='/'>{t('footer.privacyPolicy')}</Link> {/* الترجمة */}
                            </li>
                        </ul>
                    </div>

                    <div className='col-lg-3 col-md-6'>
                        <h3>{t('footer.usefulLinks')}</h3> {/* الترجمة */}
                        <ul>
                            <li><Link href="/properties?type=apartment">{t('footer.apartment')}</Link></li>
                            <li><Link href="/properties?type=villa">{t('footer.villa')}</Link></li>
                            <li><Link href="/properties?type=duplex">{t('footer.duplex')}</Link></li>
                            <li><Link href="/blog">{t('footer.blog')}</Link></li>
                            <li><Link href="/faq">{t('footer.faq')}</Link></li>
                            <li><Link href="/orders">{t('footer.myRequests')}</Link></li>
                        </ul>

                    </div>

                    <div className='col-lg-6'>
                        <h3>{t('footer.getInTouch')}</h3> {/* الترجمة */}
                        <p>{t('footer.callUs')}</p> {/* الترجمة */}
                        <h4>1800 6565 222</h4>
                        <p>{t('footer.address')}</p> {/* الترجمة */}
                    </div>

                </div>
            </div>

            {/* الجزء الثالث من الفوتر */}
            <div className='last_foot'>
                <ul className='container'>
                    <li>{t('footer.copyRight')}</li> {/* الترجمة */}

                    <li>
                        {t('footer.madeWith')} 
                        <span onClick={activeHeart} className={`heart ${addClassToggel}`}>
                            <Image src={heart} alt="Heart Icon" width={24} height={24} />
                        </span>{' '}
                        {t('footer.by')} 
                        <a target='_blank' href='https://portfolio-amber-chi-30.vercel.app/' rel="noopener noreferrer">
                            Shehap
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
