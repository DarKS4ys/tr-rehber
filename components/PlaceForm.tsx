'use client';
import React, {useState, useTransition} from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import {Locale, i18n} from '@/i18n.config';
import Input from './Input';
import Textarea from './Textarea';
import {FiLoader} from 'react-icons/fi';
import {IoMdCreate} from 'react-icons/io';
import {Button} from './ui/button';
import {Toaster, toast} from 'sonner';
import {createPlace} from '@/actions/actions';

const languageNames: Record<Locale, { [key in Locale]: string }> = {
    en: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    tr: {en: 'İngilizce', tr: 'Türkçe', es: 'İspanyolca', fr: 'Fransızca', de: 'Almanca', it: 'İtalyanca', pt: 'Portekizce', ru: 'Rusça', zh: 'Çince', ja: 'Japonca', ar: 'Arapça', ko: 'Korece', hi: 'Hintçe', fa: 'Farsça', nl: 'Hollandaca', sv: 'İsveççe', no: 'Norveççe', da: 'Danimarkaca', fi: 'Fince', el: 'Yunanca'},
    es: {en: 'Inglés', tr: 'Turco', es: 'Español', fr: 'Francés', de: 'Alemán', it: 'Italiano', pt: 'Portugués', ru: 'Ruso', zh: 'Chino', ja: 'Japonés', ar: 'Arábica', ko: 'Coreano', hi: 'Hindi', fa: 'Persa', nl: 'Holandés', sv: 'Sueco', no: 'Noruego', da: 'Danés', fi: 'Finlandés', el: 'Griego'},
    fr: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    de: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    it: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    pt: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    ru: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    zh: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    ja: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    ar: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    ko: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    hi: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    fa: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    nl: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    sv: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    no: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    da: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    fi: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
    el: {en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek'},
};

export default function PlaceForm({lang, user}: { lang: Locale; user: any }) {
    const [isPending, startTransition] = useTransition();

    const [imageUrl, setImageUrl] = useState('');
    const [extraImageUrls, setExtraImageUrls] = useState(['']);

    const [formData, setFormData] = useState<Record<Locale, any>>(
        i18n.locales.reduce((acc, locale) => {
            acc[locale] = { name: '', description: '', videoUrl: '', audioUrl: '', info: '', tags: [] };
            return acc;
        }, {} as Record<Locale, any>)
    );

    const resetFormData = () => {
        setFormData(
            i18n.locales.reduce((acc, locale) => {
                acc[locale] = { name: '', description: '', videoUrl: '', audioUrl: '', info: '', tags: [] };
                return acc;
            }, {} as Record<Locale, any>)
        );
        setImageUrl('');
        setExtraImageUrls(['']);
    };

    const handleChange = (
        locale: Locale,
        field: 'name' | 'description' | 'videoUrl' | 'audioUrl' | 'tags' | 'info',
        value: string | string[]
    ) => {
        setFormData((formData) => ({
            ...formData,
            [locale]: {
                ...formData[locale],
                [field]: value,
            },
        }));
    };

    return (
        <>
            {i18n.locales.map((locale, index) => (
                <Accordion type="single" key={locale} collapsible className="w-full">
                    <AccordionItem value={`item-${index}`} className="w-full">
                        <AccordionTrigger>
                            <p>{languageNames[lang][locale]}</p>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 flex flex-col gap-2">
                            <Input
                                required
                                name={`${lang}-name`}
                                type="text"
                                placeholder={`${languageNames[lang][locale]} Name`}
                                value={formData[locale].name}
                                onChange={(e) => handleChange(locale, 'name', e.target.value)}
                            />
                            <Textarea
                                required
                                name={`${lang}-description`}
                                placeholder={`${languageNames[lang][locale]} Description`}
                                value={formData[locale].description}
                                onChange={(e) =>
                                    handleChange(locale, 'description', e.target.value)
                                }
                            />
                            <Textarea
                                required
                                name={`${lang}-info`}
                                placeholder={`${languageNames[lang][locale]} Info`}
                                value={formData[locale].info}
                                onChange={(e) => handleChange(locale, 'info', e.target.value)}
                            />
                            <Input
                                required
                                name={`${lang}-tags`}
                                type="text"
                                placeholder={`${languageNames[lang][locale]} Tags (comma-separated)`}
                                value={formData[locale].tags.join(',')}
                                onChange={(e) =>
                                    handleChange(
                                        locale,
                                        'tags',
                                        e.target.value.split(',').map((tag) => tag.trim())
                                    )
                                }
                            />
                            <Input
                                required
                                name={`${lang}-videoUrl`}
                                type="url"
                                placeholder={`${languageNames[lang][locale]} Video Link`}
                                value={formData[locale].videoUrl}
                                onChange={(e) =>
                                    handleChange(locale, 'videoUrl', e.target.value)
                                }
                            />
                            <Input
                                required
                                name={`${lang}-audioUrl`}
                                type="url"
                                placeholder={`${languageNames[lang][locale]} Audio Link`}
                                value={formData[locale].audioUrl}
                                onChange={(e) =>
                                    handleChange(locale, 'audioUrl', e.target.value)
                                }
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}

            <Input
                required
                name="imageUrl"
                placeholder="Cover Image URL"
                value={imageUrl}
                type="url"
                onChange={(e) => setImageUrl(e.target.value)} // Update imageUrl state
            />

            <Input
                required
                name="extraImageUrls"
                placeholder="Extra Image URLs (comma-seperated)"
                value={extraImageUrls}
                type="url"
                onChange={(e) => setExtraImageUrls(e.target.value.split(',').map((url) => url.trim()))}
            />

            <Button
                className="uppercase w-full flex gap-2"
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => {
                        try {
                            const response: any = await createPlace(formData, user, imageUrl, extraImageUrls);

                            if (response.success) {
                                toast.success('Place added.');
                                resetFormData();
                            } else {
                                toast.error(response.error);
                            }
                        } catch (error: any) {
                            toast.error(error.message || 'Could not add place.');
                        }
                    });
                }}
            >
                <h1>Create</h1>
                {isPending ? <FiLoader className="animate-spin"/> : <IoMdCreate/>}
            </Button>
            <Toaster richColors closeButton/>
        </>
    );
}
