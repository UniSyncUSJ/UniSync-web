import React, { useState } from 'react';
import { Mail, User, Phone, Building, GraduationCap, Users } from 'lucide-react';
import styles from './signUp.module.scss';
import CustomButton from '../../../../components/Auth/CustomButton';
import CustomInput from '../../../../components/Auth/CustomInput';
import PasswordInput from '../../../../components/Auth/PasswordInput';

interface FormData {
  university: string;
  department: string;
  faculty: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const Universities = {
  'MIT' : "MIT",
  "Japura" : "University of Sri Jayewardenepura"
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    university: '',
    department: '',
    faculty: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [focusedField, setFocusedField] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPasswordStrength = (password: string): string | null => {
    if (password.length === 0) return null;
    if (password.length < 6) return 'weak';
    if (password.length < 10 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'medium';
    return 'strong';
  };

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Join UniSync today</p>
        </div>

        <div className={styles.form}>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Institution Details</div>
            
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Building size={20} className={styles.inputIcon} />
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className={`${styles.select} ${focusedField === 'university' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('university')}
                  onBlur={() => setFocusedField('')}
                  required
                >
                  <option value="">Select University</option>
                  <option value="harvard">Harvard University</option>
                  <option value="mit">MIT</option>
                  <option value="stanford">Stanford University</option>
                  <option value="oxford">Oxford University</option>
                  <option value="cambridge">Cambridge University</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Users size={20} className={styles.inputIcon} />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`${styles.select} ${focusedField === 'department' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('department')}
                  onBlur={() => setFocusedField('')}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business Administration</option>
                  <option value="medicine">Medicine</option>
                  <option value="law">Law</option>
                  <option value="arts">Arts & Humanities</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <GraduationCap size={20} className={styles.inputIcon} />
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className={`${styles.select} ${focusedField === 'faculty' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('faculty')}
                  onBlur={() => setFocusedField('')}
                  required
                >
                  <option value="">Select Faculty</option>
                  <option value="prof-smith">Prof. John Smith</option>
                  <option value="prof-johnson">Prof. Sarah Johnson</option>
                  <option value="prof-williams">Prof. Michael Williams</option>
                  <option value="prof-brown">Prof. Emily Brown</option>
                  <option value="prof-davis">Prof. David Davis</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Personal Information</div>
            
            <div className={styles.formGroup}>
              <CustomInput 
                type='text' 
                name='firstName' 
                placeholder='FirstName' 
                value={formData.firstName}
                onChange={handleInputChange} 
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField('')}
                className={`${focusedField === 'firstName' ? styles.inputFocus : ''}`}
                required
                icon={User}
              />

              <CustomInput 
                type='text' 
                name='lastName' 
                placeholder='Last Name' 
                value={formData.lastName}
                onChange={handleInputChange} 
                onFocus={() => setFocusedField('lasstName')}
                onBlur={() => setFocusedField('')}
                className={`${focusedField === 'lastName' ? styles.inputFocus : ''}`}
                required
                icon={User}
              />

              <CustomInput 
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${focusedField === 'email' ? styles.inputFocus : ''}`}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                required
                icon={Mail}
              />

              <CustomInput
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`${styles.input} ${focusedField === 'phoneNumber' ? styles.inputFocus : ''}`}
                onFocus={() => setFocusedField('phoneNumber')}
                onBlur={() => setFocusedField('')}
                required
                icon={Phone}
              />  

              <PasswordInput 
                name='password' 
                placeholder='Password' 
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                required
              />
              {passwordStrength && (
                <div className={`${styles.passwordStrength} ${styles[`password${passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}`]}`}>
                  Password strength: {passwordStrength}
                </div>
              )} 

              <PasswordInput 
                name='confirmPassword' 
                placeholder='Confirm Password' 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField('')}
                required
              />
              {formData.confirmPassword && (
                <div className={`${styles.passwordMatch} ${passwordsMatch ? styles.passwordMatchSuccess : styles.passwordMatchError}`}>
                  {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </div>
              )}
              
            </div>
          </div>

          <CustomButton type='submit' title='Create Account' onClick={()=>handleSubmit} />

          <div className={styles.loginLink}>
            Already have an account?{' '}
            <a href="/student/signin" className={styles.loginLinkText}>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;