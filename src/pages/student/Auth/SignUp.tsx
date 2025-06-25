import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, GraduationCap, Users } from 'lucide-react';
import styles from './signUp.module.scss';

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

const SignUpForm: React.FC = () => {
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
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
  const passwordsDontMatch = formData.confirmPassword && formData.password !== formData.confirmPassword;
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
              <div className={styles.inputWrapper}>
                <User size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${focusedField === 'firstName' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField('')}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <User size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${focusedField === 'lastName' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField('')}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Mail size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${focusedField === 'email' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Phone size={20} className={styles.inputIcon} />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`${styles.input} ${focusedField === 'phoneNumber' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('phoneNumber')}
                  onBlur={() => setFocusedField('')}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${styles.input} ${focusedField === 'password' ? styles.inputFocus : ''}`}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordStrength && (
                <div className={`${styles.passwordStrength} ${styles[`password${passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}`]}`}>
                  Password strength: {passwordStrength}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${focusedField === 'confirmPassword' ? styles.inputFocus : ''} ${passwordsDontMatch ? styles.inputError : ''}`}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className={`${styles.passwordMatch} ${passwordsMatch ? styles.passwordMatchSuccess : styles.passwordMatchError}`}>
                  {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Create Account
          </button>

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

export default SignUpForm;