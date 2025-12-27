import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";
import { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
  Chip,
  Alert,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Badge
} from "@mui/material";
import {
  ShoppingCart,
  LocationOn,
  CreditCard,
  Upload,
  CheckCircle,
  Error,
  Lock,
  AccountBalance,
  Smartphone,
  Payment,
  QrCode2,
  Close,
  CreditCard as CardIcon,
  AccountBalanceWallet,
  QrCodeScanner,
  ArrowForward,
  LocalOffer,
  Info,
  RadioButtonChecked,
  RadioButtonUnchecked,
  AccountBalance as BankIcon,
  Wallet,
  Savings,
  MonetizationOn,
  ArrowRightAlt,
  Payment as PaymentIcon,
  ArrowDropDown
} from "@mui/icons-material";

const Checkout = ({ user }) => {
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showUPIDetails, setShowUPIDetails] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG or PDF files allowed");
      return;
    }

    setPrescriptionFile(file);
  };

  const handleOnlinePaymentClick = () => {
    setOpenPaymentDialog(true);
  };

  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setUpiId("");
    setSelectedBank("");
    setSelectedWallet("");
    setShowCardDetails(false);
    setShowUPIDetails(false);
    setShowNetBanking(false);
    setShowWallets(false);
  };

  const handlePaymentSelect = (methodId, details) => {
    setOnlinePaymentMethod(methodId);
    setSelectedPaymentDetails(details);
    
    // Reset all other sections
    setShowCardDetails(methodId === "card");
    setShowUPIDetails(methodId === "upi");
    setShowNetBanking(methodId === "netbanking");
    setShowWallets(methodId === "wallet");
  };

  const handlePaymentSubmit = () => {
    if (!onlinePaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (onlinePaymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      alert("Please fill all card details");
      return;
    }

    if (onlinePaymentMethod === "upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    if (onlinePaymentMethod === "netbanking" && !selectedBank) {
      alert("Please select a bank");
      return;
    }

    if (onlinePaymentMethod === "wallet" && !selectedWallet) {
      alert("Please select a wallet");
      return;
    }

    setOpenPaymentDialog(false);
    setPaymentMethod("online");
    alert(`${selectedPaymentDetails.name} selected for payment!`);
  };

  const placeOrder = async () => {
    if (!address || !city || !pincode) {
      alert("Please fill complete address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!prescriptionFile) {
      alert("Please upload prescription before placing order");
      return;
    }

    if (paymentMethod === "online" && !onlinePaymentMethod) {
      alert("Please select an online payment method");
      return;
    }

    const formData = new FormData();
    formData.append("payment_method", paymentMethod === "online" ? onlinePaymentMethod : paymentMethod);
    formData.append("address", `${address}, ${city} - ${pincode}`);
    formData.append("prescription", prescriptionFile);

    cartItems.forEach((item, index) => {
      formData.append(`cart[${index}][product_id]`, item.id);
      formData.append(`cart[${index}][qty]`, item.qty);
    });

    try {
      setLoading(true);
      const { response, error } = await apiCall(
        "POST",
        ApiEndpoints.PLACE_ORDER,
        formData,
        true
      );

      if (error || !response?.status) {
        alert(response?.message || "Order failed");
        return;
      }

      alert(`Order placed successfully\nOrder No: ${response.order_number}`);
      clearCart();
      navigate("/myorders");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Payment options with Amazon-like structure
  const paymentOptions = [
    {
      id: "card",
      name: "Credit or debit card",
      icon: <CardIcon />,
      color: "#FF6B6B",
      description: "Visa, Mastercard, RuPay, Amex",
      subOptions: ["VISA", "Mastercard", "RuPay", "American Express"]
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <BankIcon />,
      color: "#1A5276",
      description: "All major banks",
      banks: [
        "State Bank of India",
        "HDFC Bank", 
        "ICICI Bank",
        "Axis Bank",
        "Kotak Mahindra Bank",
        "Punjab National Bank",
        "Bank of Baroda",
        "Canara Bank"
      ]
    },
    {
      id: "upi",
      name: "UPI",
      icon: <QrCodeScanner />,
      color: "#6F42C1",
      description: "Scan and Pay with UPI",
      upiApps: ["Google Pay", "PhonePe", "Paytm", "BHIM", "Amazon Pay"]
    },
    {
      id: "wallet",
      name: "Wallets",
      icon: <Wallet />,
      color: "#00A8FF",
      description: "Paytm, Amazon Pay, PhonePe Wallet",
      wallets: ["Paytm Wallet", "Amazon Pay", "PhonePe Wallet", "MobiKwik", "Freecharge"]
    },
    {
      id: "emi",
      name: "EMI",
      icon: <MonetizationOn />,
      color: "#4CAF50",
      description: "Easy monthly installments",
      disabled: true,
      disabledReason: "Unavailable Why?"
    },
    {
      id: "cod",
      name: "Cash on Delivery/Pay on Delivery",
      icon: <PaymentIcon />,
      color: "#FF9800",
      description: "Pay when you receive",
      showInDialog: false
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: "100vh", bgcolor: "#f4f6f8", mt:-13 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#1A5276",
          mb: 4,
          fontWeight: 600,
          letterSpacing: 1
        }}
      >
        Checkout
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {/* ORDER SUMMARY */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%"
            }}
          >
            <Box
              sx={{
                bgcolor: "#1A5276",
                color: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <ShoppingCart />
              <Typography variant="h6" fontWeight={600}>
                Order Summary
              </Typography>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              {cartItems.length ? (
                <>
                  <Stack spacing={2}>
                    {cartItems.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: 1,
                          borderBottom: "1px solid #eee"
                        }}
                      >
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Qty: {item.qty}
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          ₹{(item.price * item.qty).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      Total
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{ color: "#1A5276" }}
                    >
                      ₹{cartTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Alert severity="info">Your cart is empty</Alert>
              )}
            </CardContent>
          </Paper>
        </Grid>

        {/* DELIVERY DETAILS */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%"
            }}
          >
            <Box
              sx={{
                bgcolor: "#1A5276",
                color: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <LocationOn />
              <Typography variant="h6" fontWeight={600}>
                Delivery Details
              </Typography>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Shipping Address
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter complete shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
                variant="outlined"
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    inputProps={{ maxLength: 6 }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                <Box display="flex" alignItems="center" gap={1}>
                  <Upload fontSize="small" />
                  Upload Prescription
                  <Chip
                    label="Required"
                    size="small"
                    color="error"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Typography>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  border: "2px dashed #1A5276",
                  py: 2,
                  mb: 2
                }}
              >
                <Upload sx={{ mr: 1 }} />
                Click to upload prescription
                <input
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                />
              </Button>

              {prescriptionFile ? (
                <Alert
                  icon={<CheckCircle fontSize="small" />}
                  severity="success"
                  sx={{ mb: 2 }}
                >
                  {prescriptionFile.name}
                </Alert>
              ) : (
                <Alert
                  icon={<Error fontSize="small" />}
                  severity="warning"
                  sx={{ mb: 2 }}
                >
                  Prescription file required
                </Alert>
              )}
            </CardContent>
          </Paper>
        </Grid>

        {/* PAYMENT SECTION */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              position: "sticky",
              top: 20,
                height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Box
              sx={{
                bgcolor: "#1A5276",
                color: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <CreditCard />
              <Typography variant="h6" fontWeight={600}>
                Payment
              </Typography>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Select Payment Method
              </Typography>

              <RadioGroup
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  if (e.target.value === "online") {
                    handleOnlinePaymentClick();
                  } else {
                    setOnlinePaymentMethod("");
                  }
                }}
              >
                <Paper
                  elevation={paymentMethod === "cod" ? 2 : 0}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: `2px solid ${
                      paymentMethod === "cod" ? "#1A5276" : "#e0e0e0"
                    }`,
                    borderRadius: 1,
                    bgcolor: paymentMethod === "cod" ? "#eaf4fb" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#1A5276"
                    }
                  }}
                  onClick={() => {
                    setPaymentMethod("cod");
                    setOnlinePaymentMethod("");
                  }}
                >
                  <FormControlLabel
                    value="cod"
                    control={
                      <Radio
                        sx={{
                          color: "#1A5276",
                          "&.Mui-checked": {
                            color: "#1A5276"
                          }
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography fontWeight={600}>
                          Cash on Delivery
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay when you receive the order
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper
                  elevation={paymentMethod === "online" ? 2 : 0}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: `2px solid ${
                      paymentMethod === "online" ? "#1A5276" : "#e0e0e0"
                    }`,
                    borderRadius: 1,
                    bgcolor: paymentMethod === "online" ? "#eaf4fb" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#1A5276"
                    }
                  }}
                  onClick={handleOnlinePaymentClick}
                >
                  <FormControlLabel
                    value="online"
                    control={
                      <Radio
                        sx={{
                          color: "#1A5276",
                          "&.Mui-checked": {
                            color: "#1A5276"
                          }
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography fontWeight={600}>
                          Online Payment
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay securely with card/UPI
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>

              {/* Selected Payment Method Display */}
              {onlinePaymentMethod && (
                <Paper
                  sx={{
                    p: 1.5,
                    mb: 2,
                    bgcolor: "#f9f9f9",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircle sx={{ color: "#4CAF50", fontSize: 18 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {paymentOptions.find(opt => opt.id === onlinePaymentMethod)?.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#666" }}>
                          Click to change payment method
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      size="small"
                      onClick={handleOnlinePaymentClick}
                      sx={{ color: "#1A5276" }}
                    >
                      Change
                    </Button>
                  </Box>
                </Paper>
              )}

              {loading && <LinearProgress sx={{ mb: 2 }} />}

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={placeOrder}
                disabled={
                  loading ||
                  !cartItems.length ||
                  !prescriptionFile ||
                  (paymentMethod === "online" && !onlinePaymentMethod)
                }
                sx={{
                  bgcolor: "yellow",
                  color: "#1A5276",
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  "&:hover": {
                    bgcolor: "#FFD700"
                  },
                  "&.Mui-disabled": {
                    bgcolor: "#ccc",
                    color: "#666"
                  }
                }}
              >
                {loading ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "2px solid #1A5276",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }}
                    />
                    Placing Order...
                  </Box>
                ) : paymentMethod === "online" ? (
                  `Pay ₹${cartTotal.toFixed(2)}`
                ) : (
                  `Place Order : ₹${cartTotal.toFixed(2)}`
                )}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  color: "#1A5276"
                }}
              >
                <Lock fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  {paymentMethod === "online"
                    ? "256-bit SSL secured payment"
                    : "Secure & encrypted checkout"}
                </Typography>
              </Box>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>

      {/* Amazon-style Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={handlePaymentDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh"
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: "#f8f9fa", 
          color: "#1A5276",
          borderBottom: "1px solid #e0e0e0",
          py: 2
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight={600}>
              Select Payment Method
            </Typography>
            <IconButton 
              onClick={handlePaymentDialogClose}
              size="small"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <Grid container>
            {/* Left Column - Payment Options */}
            <Grid item xs={12} md={8} sx={{ p: 3 }}>
              {/* Promo Code Section */}
              <Paper sx={{ p: 2, mb: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Enter Code
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    sx={{ bgcolor: "white" }}
                  />
                  <Button 
                    variant="contained"
                    sx={{ 
                      bgcolor: "#1A5276", 
                      color: "white",
                      minWidth: 100
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Paper>

              {/* Payment Methods List */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                Another payment method
              </Typography>

              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {paymentOptions.filter(opt => opt.id !== "cod").map((option) => (
                  <Paper 
                    key={option.id}
                    elevation={0}
                    sx={{ 
                      mb: 2,
                      border: `1px solid ${
                        onlinePaymentMethod === option.id ? "#1A5276" : "#e0e0e0"
                      }`,
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}
                  >
                    <ListItem
                      button
                      onClick={() => !option.disabled && handlePaymentSelect(option.id, option)}
                      disabled={option.disabled}
                      sx={{
                        py: 2,
                        bgcolor: onlinePaymentMethod === option.id ? '#eaf4fb' : 'transparent',
                        borderLeft: onlinePaymentMethod === option.id ? '4px solid #1A5276' : 'none'
                      }}
                    >
                      <ListItemIcon>
                        {onlinePaymentMethod === option.id ? (
                          <RadioButtonChecked sx={{ color: "#1A5276" }} />
                        ) : (
                          <RadioButtonUnchecked />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: option.color, display: 'flex', alignItems: 'center' }}>
                              {option.icon}
                            </Box>
                            <Typography fontWeight={600}>
                              {option.name}
                            </Typography>
                            {option.disabled && (
                              <Chip 
                                label={option.disabledReason} 
                                size="small" 
                                variant="outlined"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {option.description}
                          </Typography>
                        }
                      />
                      {onlinePaymentMethod === option.id && (
                        <ArrowRightAlt sx={{ color: "#1A5276" }} />
                      )}
                    </ListItem>

                    {/* Card Details Section */}
                    {option.id === "card" && onlinePaymentMethod === "card" && (
                      <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderTop: "1px solid #e0e0e0" }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Enter Card Details
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Card Number"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CardIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Expiry Date"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="CVV"
                              type="password"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {/* UPI Details Section */}
                    {option.id === "upi" && onlinePaymentMethod === "upi" && (
                      <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderTop: "1px solid #e0e0e0" }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Scan and Pay with UPI
                        </Typography>
                        <Box sx={{ textAlign: 'center', my: 2 }}>
                          <Button
                            variant="outlined"
                            startIcon={<QrCodeScanner />}
                            fullWidth
                            sx={{ mb: 2 }}
                          >
                            Scan QR Code
                          </Button>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            OR
                          </Typography>
                          <TextField
                            fullWidth
                            label="Enter UPI ID"
                            placeholder="username@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </Box>
                      </Box>
                    )}

                    {/* Net Banking Section */}
                    {option.id === "netbanking" && onlinePaymentMethod === "netbanking" && (
                      <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderTop: "1px solid #e0e0e0" }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Select Bank
                        </Typography>
                        <Grid container spacing={1}>
                          {option.banks?.map((bank, index) => (
                            <Grid item xs={6} key={index}>
                              <Paper
                                elevation={selectedBank === bank ? 1 : 0}
                                onClick={() => setSelectedBank(bank)}
                                sx={{
                                  p: 1.5,
                                  border: `1px solid ${selectedBank === bank ? "#1A5276" : "#e0e0e0"}`,
                                  borderRadius: 1,
                                  cursor: 'pointer',
                                  bgcolor: selectedBank === bank ? '#eaf4fb' : 'white',
                                  '&:hover': {
                                    borderColor: "#1A5276"
                                  }
                                }}
                              >
                                <Typography variant="body2" align="center">
                                  {bank}
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

                    {/* Wallets Section */}
                    {option.id === "wallet" && onlinePaymentMethod === "wallet" && (
                      <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderTop: "1px solid #e0e0e0" }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Select Wallet
                        </Typography>
                        <Grid container spacing={1}>
                          {option.wallets?.map((wallet, index) => (
                            <Grid item xs={6} key={index}>
                              <Paper
                                elevation={selectedWallet === wallet ? 1 : 0}
                                onClick={() => setSelectedWallet(wallet)}
                                sx={{
                                  p: 1.5,
                                  border: `1px solid ${selectedWallet === wallet ? "#1A5276" : "#e0e0e0"}`,
                                  borderRadius: 1,
                                  cursor: 'pointer',
                                  bgcolor: selectedWallet === wallet ? '#eaf4fb' : 'white',
                                  '&:hover': {
                                    borderColor: "#1A5276"
                                  }
                                }}
                              >
                                <Typography variant="body2" align="center">
                                  {wallet}
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Paper>
                ))}
              </List>
            </Grid>

            {/* Right Column - Order Summary */}
            <Grid item xs={12} md={4} sx={{ bgcolor: "#f8f9fa", p: 3, borderLeft: "1px solid #e0e0e0" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "#1A5276" }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {cartItems.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    
                    <Typography variant="body2">
                      {item.name} x {item.qty}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2" fontWeight={600}>₹{cartTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2" color="success.main">FREE</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Order Total</Typography>
                <Typography variant="h5" fontWeight={700} sx={{ color: "#1A5276" }}>
                  ₹{cartTotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Lock fontSize="small" sx={{ color: "#4CAF50" }} />
                <Typography variant="caption" color="text.secondary">
                  Secure & encrypted payment
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, px: 3, borderTop: "1px solid #e0e0e0", bgcolor: "#f8f9fa" }}>
          <Button 
            onClick={handlePaymentDialogClose} 
            color="inherit"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePaymentSubmit}
            disabled={!onlinePaymentMethod}
            sx={{
              bgcolor: "yellow",
              color: "#1A5276",
              fontWeight: 600,
              minWidth: 200,
              py: 1.5
            }}
          >
            {onlinePaymentMethod ? `Use this payment method` : 'Select Payment Method'}
          </Button>
        </DialogActions>
      </Dialog>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Container>
  );
};

export default Checkout;