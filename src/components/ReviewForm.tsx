import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Review} from "../types/review.ts";


const ReviewForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Review>();

    const onSubmit = async (data:Review) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const response = await fetch('/api/submit-review', {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    date: new Date().toISOString()
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке');
            }

            reset();
            setSubmitStatus('success');
        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Оставить отзыв</h3>

            {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    Спасибо за ваш отзыв! После модерации он появится на сайте.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже.
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ваше имя</label>
                    <input
                        className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('name', { required: 'Имя обязательно' })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ваш отзыв</label>
                    <textarea
                        className={`w-full px-3 py-2 border rounded-md ${errors.text ? 'border-red-500' : 'border-gray-300'}`}
                        rows={4}
                        {...register('text', {
                            required: 'Текст отзыва обязателен',
                            minLength: { value: 10, message: 'Отзыв должен содержать минимум 10 символов' }
                        })}
                    />
                    {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50 transition"
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;